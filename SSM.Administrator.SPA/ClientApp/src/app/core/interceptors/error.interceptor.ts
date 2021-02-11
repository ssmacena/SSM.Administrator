import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ErrorHelper } from '../helpers';
import { appConfig } from '@app/app-config';
import { AuthenticationService } from '@app/business/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 403) {
          // auto logout if 401 response returned from api
          // this.authenticationService.logout();
          this.auth.localLogout();
        }

        this.toastr.error(
          ErrorHelper.raiseDefaultErrorDescription,
          `${ErrorHelper.raiseDefaultErrorTitle}!`
        );

        return throwError(err);
      })
    );
  }
}
