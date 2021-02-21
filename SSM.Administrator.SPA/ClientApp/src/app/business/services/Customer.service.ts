import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';

import { ApiRouteHelper, ErrorHelper } from '@app/core/helpers';
import { Customer } from '../models';
import { appConfig } from '@app/app-config';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  static customerWasSelected = new EventEmitter<Customer>();
  selectedCustomer: Customer;
  constructor(private http: HttpClient) {}

  //http://localhost:59921/customer/getByFilter?nmCliente=Silvio
  //API_SECURE_URL: '/api/secure/',
  public getCustomer(filterModel: any) {
    let params = new HttpParams();
    params = params.set('nmCliente', filterModel);
    console.log(filterModel);
    return this.http
      .get<Customer[]>(ApiRouteHelper.secureRoute('customer/getByFilter'), {
        params,
      })
      .pipe(tap(console.log));
  }

  public getCustomerById(customerId: number) {
    let params = new HttpParams();
    params = params.set('customerId', customerId.toString());

    return this.http
      .get<Customer>(ApiRouteHelper.secureRoute('customer/getById'), {
        params,
      })
      .subscribe((customer: Customer) => {
        this.selectedCustomer = customer;
        CustomerService.customerWasSelected.emit(customer);
      });
  }

  public saveCustomer(record: any) {
    console.log(record);
    return this.http.post(
      ApiRouteHelper.secureRoute('customer/save-entity'),
      record
    );
  }

  // static secureRoute(url: string): string {
  //   return `${appConfig.API_SECURE_URL}${url}`;
  // } API_SECURE_URL: '/api/secure/',

  public deleteCustomer(id: number) {
    return this.http.delete(ApiRouteHelper.secureRoute('customer/' + `${id}`));
  }
}
