import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';

import { ApiRouteHelper, ErrorHelper } from '@app/core/helpers';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  //http://localhost:59921/customer/getByFilter?nmCliente=Silvio
  //API_SECURE_URL: '/api/secure/',
  public getCustomer(requestModel: any) {
    let params = new HttpParams();
    params = params.set('nmCliente', requestModel);
    console.log(requestModel);
    console.log(ApiRouteHelper.secureRoute('customer/getByFilter'));
    return this.http
      .get<Customer[]>(ApiRouteHelper.secureRoute('customer/getByFilter'), {
        params,
      })
      .pipe(tap(console.log));
  }
}
