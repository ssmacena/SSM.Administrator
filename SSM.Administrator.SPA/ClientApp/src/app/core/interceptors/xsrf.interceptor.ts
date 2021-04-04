import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpXSRFInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}
  //https://gist.github.com/anddam/f54c595f63a9371cd41a930418a91d47
  //https://angular.io/api/common/http/HttpClientXsrfModule
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newHeaders: HttpHeaders = req.headers;
    const headerName = 'XSRF-REQUEST-TOKEN';
    const respHeaderName = 'X-XSRF-TOKEN';

    var tokenEx = this.tokenExtractor.getToken() as string;
    var token = this.getCookieValue('X-XSRF-TOKEN');
    console.log('token:', token);
    if (token !== null && !req.headers.has(headerName)) {
      newHeaders = newHeaders.append(respHeaderName, token);
    } else {
      newHeaders = newHeaders.append(respHeaderName, 'undefined');
    }
    const authorizedRequest = req.clone({
      headers: newHeaders,
    });

    return next.handle(authorizedRequest);
  }

  private getCookieValue(cookieName: string) {
    const allCookies = decodeURIComponent(document.cookie).split('; ');
    for (let i = 0; i < allCookies.length; i++) {
      const cookie = allCookies[i];
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return '';
  }
}
