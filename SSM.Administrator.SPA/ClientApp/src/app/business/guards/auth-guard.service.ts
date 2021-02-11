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
      let originalUrl = document.location.href;
      let index = originalUrl.indexOf(`${appConfig.MAIN_ACCOUNT_ROUTE}/`);

      if (index > -1) this.returnUrl = originalUrl.substr(index);

      return this.auth
        .login()
        .pipe(first())
        .pipe(
          map((response) => {
            if (this.auth.loggedIn) {
              if (this.auth.user.accounts.length > 1) {
                let destMultipleAccountUrl = appConfig.MAIN_ALL_ACCOUNT_ROUTE;

                if (
                  this.returnUrl != '' &&
                  this.returnUrl != destMultipleAccountUrl
                )
                  this.router.navigate([
                    destMultipleAccountUrl,
                    { returnUrl: this.returnUrl },
                  ]);
                else this.router.navigate([destMultipleAccountUrl]);
              } else {
                this.auth
                  .loadAccount(this.auth.user.currentAccount.key)
                  .subscribe((o) => {
                    let destSingleAccountUrl = appConfig.MAIN_ACCOUNT_ROUTE;

                    if (
                      this.returnUrl != '' &&
                      this.returnUrl != destSingleAccountUrl
                    )
                      this.router.navigate([this.returnUrl]);
                    else this.router.navigate([destSingleAccountUrl]);

                    //this.messageService.load();
                  });
              }

              return true;
            }

            // otherwise redirect to login page with the return url
            this.router.navigate([appConfig.MAIN_ROUTE], {
              queryParams: { returnUrl: this.returnUrl },
            });
            return false;
          }),
          catchError((err) => {
            this.router.navigate([appConfig.MAIN_ROUTE], {
              queryParams: { returnUrl: this.returnUrl },
            });
            return of(false);
          })
        );
    }
  }
}
