import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '@app/business/services/Customer.service';
import { ErrorHelper } from '@app/core/helpers';
import { Destroyer } from '@app/core/super-class';
import { share, catchError, takeUntil } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AccordionPanelComponent } from 'ngx-bootstrap/accordion';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent extends Destroyer implements OnInit {
  @ViewChild(TabsetComponent) tabset: TabsetComponent;
  @ViewChild('filtroAccordion') accordionFiltro: AccordionPanelComponent;
  @ViewChild('cadastroAccordion') accordionCadastro: AccordionPanelComponent;
  customer$: Observable<any>;
  customerId: number;
  searchForm: FormGroup;
  currentSearchForm: any;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
    });
  }

  onSubmit() {
    this.tabset.tabs[0].active = true;
    if (!this.invalidForm()) {
      this.currentSearchForm = this.searchForm.get('name')?.value;
      console.log(this.currentSearchForm);
      this.getCustomer();
      this.accordionCadastro.isOpen = true;
    }
  }

  onPageChange(config: any) {
    //this.tabset.tabs[1].active = true;
    this.currentSearchForm.Start = config.start;
    this.currentSearchForm.Draw = config.currentPage;
    this.getCustomer();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCustomerWasSelected(id: number) {
    this.tabset.tabs[1].active = true;
    this.accordionFiltro.isOpen = false;
    this.customerId = id;
  }

  invalidForm(): boolean {
    return !(this.searchForm && this.searchForm.valid);
  }

  private getCustomer() {
    this.customerService
      .getCustomer(this.currentSearchForm)
      .subscribe((dados) => (this.customer$ = dados));
  }
}
