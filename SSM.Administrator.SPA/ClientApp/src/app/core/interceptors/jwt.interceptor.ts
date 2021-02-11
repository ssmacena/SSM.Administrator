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
    const token = localStorage.getItem(appConfig.SN_TOKEN);

    // add authorization header with jwt token if available
    if (token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
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
