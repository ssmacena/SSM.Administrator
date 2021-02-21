import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from '@angular/router';

import { first, catchError, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';

import { appConfig } from '@app/app-config';
import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  returnUrl: string = '';

  constructor(private router: Router, private auth: AuthenticationService) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.returnUrl = '';

    //If token data exist, user may login to application
    if (this.auth.loggedIn && localStorage.getItem(appConfig.SN_TOKEN)) {
      return of(true);
    } else {
      return of(false);
    }
  }
}
