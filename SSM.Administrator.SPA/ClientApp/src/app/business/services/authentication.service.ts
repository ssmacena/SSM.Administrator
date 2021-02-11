import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular//common/http';

import { map, catchError, mergeMap, take, takeUntil } from 'rxjs/operators';
import { interval, Observable, of, forkJoin, Subject, empty } from 'rxjs';

import { appConfig } from '@app/app-config';
import { AntiforgeryTokenService } from '@app/core/services';
import { ApiRouteHelper, JsonHelper, ErrorHelper } from '@app/core/helpers';
import { SessionnService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private headerTextHTML: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'text/html; charset=utf-8'
  );

  private interval$: Observable<number>;
  private timerTimeout$: Observable<number>;
  private timeoutLogout: number = 60; //(60 minutes)
  private timer$: Subject<boolean> = new Subject();

  loggedIn$: Subject<boolean> = new Subject();
  loggedIn: boolean = false;
  user: any;
  isInMaintenance: boolean = false;

  constructor(
    private http: HttpClient,
    private session: SessionnService,
    private antiforgery: AntiforgeryTokenService
  ) {
    this.interval$ = interval(300000); //5 minutes interval
    this.timerTimeout$ = interval(1000); //1 seconds
  }

  login() {
    let antiforgery$ = this.antiforgery.generate();
    let maintenance$ = this.maintenance();
    let authenticate$ = this.authenticate();

    return authenticate$.pipe(
      mergeMap(() => {
        if (this.loggedIn) {
          return forkJoin(antiforgery$, maintenance$);
        }
        return empty();
      })
    );
  }

  logout() {
    return this.http
      .post<any>(ApiRouteHelper.secureRoute('user/logout'), {})
      .pipe(
        map(() => {
          this.ssoLogout()
            .pipe(takeUntil(this.loggedIn$))
            .subscribe(() => {
              this.localLogout();
            });
        })
      );
  }

  localLogout() {
    localStorage.removeItem(appConfig.SN_TOKEN); // remove user from local storage to log user out
    localStorage.removeItem(appConfig.SN_DATE_DOMAIN); //remove domain informations from local storage
    localStorage.removeItem(appConfig.SN_CONFIG_DOMAIN);

    if (this.loggedIn$) {
      this.loggedIn$.next(false);
      this.loggedIn$.unsubscribe();
    }

    this.user = null;
    this.loggedIn = false;
    //this.messageService.reset();
  }

  ssoLogout() {
    // sitminder token logout
    return this.http.get(appConfig.SITEMINDER_LOGOUT_URL, {
      observe: 'body',
      headers: this.headerTextHTML,
      responseType: 'text',
    });
  }

  loadAccount(key: string) {
    let set$ = this.setCurrentAccount(key);
    let registry$ = this.registryAccessAccount();

    //reset global variables
    //this.messageService.reset();

    return set$.pipe(mergeMap(() => forkJoin(registry$)));
  }

  resetTimeoutLogout() {
    if (this.user)
      this.timeoutLogout = this.calculateTimeoutLogoutValue(
        this.user.timeoutLogout
      );
  }

  //============================================================================================ #Privates Methods
  private authenticate() {
    return this.http
      .post(
        ApiRouteHelper.secureRoute('user/authenticate'),
        {},
        { observe: 'body', headers: this.headerTextHTML, responseType: 'text' }
      )
      .pipe(
        map((response) => {
          //Always that the Siteminder to intecept request and identify that  it is not  authenticated, it is redirected siteminer page SSO.
          if (JsonHelper.IsJsonString(response)) {
            //returned json object
            let user = JSON.parse(response);

            // login successful if there's a jwt token in the response
            if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem(appConfig.SN_TOKEN, JSON.stringify(user));

              this.loggedIn = true;
              this.loggedIn$ = new Subject();
              this.timer$ = new Subject();
              this.timeoutLogout = this.calculateTimeoutLogoutValue(
                user.timeoutLogout
              );

              this.user = user;
              this.startValidateSession();
              this.startTimeout();

              return user;
            }
          }

          return null;
        }),
        catchError(ErrorHelper.handle)
      );
  }

  private setCurrentAccount(key: string) {
    this.user.currentAccount = this.user.accounts.find((o) => o.key === key);
    localStorage.setItem(appConfig.SN_TOKEN, JSON.stringify(this.user));

    return empty();
    // return of(true).pipe(
    //   map((o) => {
    //     this.user.currentAccount = this.user.accounts.find(
    //       (o) => o.key === key
    //     );
    //     localStorage.setItem(appConfig.SN_TOKEN, JSON.stringify(this.user));
    //   })
    // );
  }

  private startValidateSession() {
    this.interval$.pipe(takeUntil(this.loggedIn$)).subscribe(() => {
      this.session.check().pipe(takeUntil(this.loggedIn$)).subscribe();
    });
  }

  private startTimeout() {
    this.timerTimeout$.pipe(takeUntil(this.timer$)).subscribe(() => {
      this.timeoutLogout--;

      if (this.timeoutLogout <= 0) {
        this.timer$.next(false);
        this.timer$.unsubscribe();
        this.logout().pipe(takeUntil(this.loggedIn$)).subscribe();
      }
    });
  }

  private registryAccessAccount() {
    return this.http.post<boolean>(
      ApiRouteHelper.secureRoute('user/login'),
      {}
    );
  }

  private calculateTimeoutLogoutValue(value: number) {
    if (value <= 0) value = 60; //(default 60 minutes)

    return value * 60; //(convert to seconds);
  }

  private maintenance() {
    return this.http
      .get<any>(ApiRouteHelper.secureRoute('user/maintenance'))
      .pipe(
        map((isInMaintenance) => {
          this.isInMaintenance = isInMaintenance;
          return isInMaintenance;
        })
      );
  }
}
