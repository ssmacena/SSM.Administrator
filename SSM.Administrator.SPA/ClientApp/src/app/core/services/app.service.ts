import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';

import { ApiRouteHelper } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public init() {
    //server init
    this.http.post<any>(ApiRouteHelper.route('init'), {}).subscribe();
  }
}
