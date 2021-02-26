import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AccordionPanelComponent } from 'ngx-bootstrap/accordion';
import { BaseFormComponent } from '../../../shared/form-validation/base-form/base-form.component';
import { Customer } from '@app/business/models';
import { CustomerService } from '@app/business/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent extends BaseFormComponent implements OnInit {
  @ViewChild(TabsetComponent) tabset: TabsetComponent;
  @ViewChild('filtroAccordion') accordionFiltro: AccordionPanelComponent;
  @ViewChild('cadastroAccordion') accordionCadastro: AccordionPanelComponent;
  subscription: Subscription;
  customer$: Observable<any>;
  customerId: number;
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
    this.abstractForm = this.formBuilder.group({
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

  submit() {
    this.tabset.tabs[0].active = true;
    this.currentSearchForm = this.abstractForm.get('name')?.value;
    this.getCustomer();
    this.accordionCadastro.isOpen = true;
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

  private getCustomer() {
    this.subscription = this.customerService
      .getCustomer(this.currentSearchForm)
      .subscribe((dados) => (this.customer$ = dados));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
