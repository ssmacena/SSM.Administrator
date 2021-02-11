import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { takeUntil } from 'rxjs/operators';

import { appConfig } from '@app/app-config';
import { Destroyer } from '@app/core/super-class';
import { AppService, AntiforgeryTokenService } from './core/services';
import { AuthenticationService } from './business/services';
import { ApiRouteHelper } from './core/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends Destroyer implements OnInit {
  title = 'InternetBanking';

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private app: AppService,
    private antiforgery: AntiforgeryTokenService
  ) {
    super();
  }

  ngOnInit() {
    this.router.navigate([appConfig.MAIN_ROUTE]);
    // this.app.init();
    // this.auth.loggedIn$.pipe(takeUntil(this.destroy$)).subscribe((logged) => {
    //   if (!logged) {
    //     this.router.navigate([appConfig.MAIN_ROUTE]);
    //   }
    // });
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnloadHander(event) {
    this.leave();
  }

  leave() {
    let antiForgeryToken = this.antiforgery.antiforgeryKeyToken || '';

    // if (this.auth.user) {
    //   // the http call must be synchronous.
    //   // the 'unload' event won't wait for async
    //   // angular's http doesn't support synchronous requests
    //   // this is why we use JQUERY + AJAX
    //   $.ajax({
    //     headers: {
    //       Authorization: `Bearer ${this.auth.user.token}`,
    //       'X-XSRF-Token': antiForgeryToken,
    //     },
    //     type: 'POST',
    //     async: false,
    //     url: ApiRouteHelper.secureRoute('user/logout'),
    //   });
    // }
  }
}
