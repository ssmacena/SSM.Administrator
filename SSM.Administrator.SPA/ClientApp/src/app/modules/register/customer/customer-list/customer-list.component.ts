import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Changes } from 'ngx-reactivetoolkit';
import { ToastrService } from 'ngx-toastr';

import { Destroyer } from '@app/core/super-class';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '@app/business/services/Customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent
  extends Destroyer
  implements OnInit, OnChanges {
  @Output() pageChangedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() customerSelectedEvent = new EventEmitter<number>();
  @Input() data: any;
  @Input() show: boolean;
  @Changes('data') data$; //it listen changes on "@Input() data: any" variable.
  customerId: number;
  public config: PaginationInstance = {
    id: 'pageConfigReportIncome',
    itemsPerPage: 5,
    currentPage: 1,
  };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    super();

    // this.data$.pipe(takeUntil(this.destroy$)).subscribe((documents) => {
    //   if (documents) {
    //     this.config.totalItems = 5;
    //   }
    // });
  }

  ngOnInit() {}

  ngOnChanges(): void {}

  onPageChange(currentPage: number) {
    this.config.currentPage = currentPage;
    let start =
      this.config.currentPage * this.config.itemsPerPage -
      this.config.itemsPerPage;
    this.pageChangedEvent.emit({ currentPage: currentPage, start: start });
  }

  onEdit(id: number) {
    this.customerSelectedEvent.emit(id);
  }
}
