import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingScreenService } from '../services/loading-screen.service';
import { ApiRouteHelper } from '../helpers/api-route.helper';
import { AuthenticationService } from '@app/business/services';

@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {
  activeRequests: number = 0;

  /**
   * URLs for which the loading screen should not be enabled
   */
  skippUrls = [
    '/authrefresh',
    ApiRouteHelper.secureRoute('user/check-session'),
    ApiRouteHelper.secureRoute('user/set-preference'),
    ApiRouteHelper.secureRoute('account/interactive-messages/agree'),
    ApiRouteHelper.secureRoute('account/interactive-messages/not-agree'),
  ];

  constructor(
    private loadingScreenService: LoadingScreenService,
    private auth: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let displayLoadingScreen = true;

    for (const skippUrl of this.skippUrls) {
      if (new RegExp(skippUrl).test(request.url)) {
        displayLoadingScreen = false;
        break;
      }
    }

    if (displayLoadingScreen) {
      if (this.activeRequests === 0) {
        this.loadingScreenService.startLoading();
      }
      this.activeRequests++;

      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loadingScreenService.stopLoading();
            this.auth.resetTimeoutLogout();
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
