import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';

import { ApiRouteHelper } from '../helpers';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AntiforgeryTokenService {
  antiforgeryKeyToken?: string;

  constructor(private http: HttpClient) {}

  public generate() {
    return this.http
      .get<any>(ApiRouteHelper.secureRoute('antiforgery/generate'))
      .pipe(
        map((token) => {
          this.antiforgeryKeyToken = token;
          return token;
        })
      );
  }
}
