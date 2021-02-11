import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { appConfig } from '@app/app-config';
import { Destroyer } from '@app/core/super-class';
import { AuthenticationService } from '@app/business/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends Destroyer implements OnInit {
  loading = false;
  error = '';
  submitted = false;

  logout$ = new Subscription();
  login$ = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthenticationService
  ) {
    super();
    this.logout$;
  }

  ngOnInit() {}

  logout() {
    this.submitted = true;
    this.loading = true;
    this.logout$ = this.auth
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.router.navigate([appConfig.MAIN_ROUTE]);
          this.submitted = false;
          this.loading = false;
        },
        (error) => {
          this.error = error;
          this.submitted = false;
          this.loading = false;
        }
      );
  }

  login() {
    this.router.navigate([appConfig.MAIN_ACCOUNT_ROUTE]);
  }

  changeTo(key: string) {
    this.auth
      .loadAccount(key)
      .pipe(takeUntil(this.destroy$))
      .subscribe((o) => {
        //this.messageService.load();
        this.router.navigate([appConfig.MAIN_ACCOUNT_ROUTE]);
      });
  }
}
