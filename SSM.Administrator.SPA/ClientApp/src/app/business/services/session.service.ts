import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';

import { catchError, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EMPTY } from 'rxjs';
import { ApiRouteHelper } from '@app/core/helpers';

@Injectable({
  providedIn: 'root',
})
export class SessionnService {
  valid$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {}

  check() {
    return this.http
      .post<any>(ApiRouteHelper.secureRoute('user/check-session'), {})
      .pipe(
        take(1),
        catchError((e) => {
          this.valid$.next(false);
          return EMPTY;
        })
      );
  }
}
