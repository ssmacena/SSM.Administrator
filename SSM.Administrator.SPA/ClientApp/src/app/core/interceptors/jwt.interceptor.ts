import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

import { appConfig } from '@app/app-config';
import { AntiforgeryTokenService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private antiforgery: AntiforgeryTokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const token = localStorage.getItem(appConfig.SN_TOKEN);

    const data = localStorage.getItem('userData') || '{}';
    const userData: {
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(data);

    // add authorization header with jwt token if available
    if (userData) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userData._token}`,
        },
      });
    }

    // add X-XSRF-Token -> Anti forgery validation
    let antiForgeryToken = this.antiforgery.antiforgeryKeyToken || '';

    request = request.clone({
      setHeaders: {
        'X-XSRF-Token': antiForgeryToken,
      },
    });

    return next.handle(request);
  }
}
