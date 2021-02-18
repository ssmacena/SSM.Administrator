import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';

import { ApiRouteHelper } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  //http://localhost:59921/public/init
  public init() {
    //server init
    console.log(ApiRouteHelper.route('init'));
    this.http.post<any>(ApiRouteHelper.route('init'), {}).subscribe();
  }
}
