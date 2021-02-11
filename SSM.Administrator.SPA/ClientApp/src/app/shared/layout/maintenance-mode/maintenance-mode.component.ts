import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { appConfig } from '@app/app-config';
import { AuthenticationService } from '@app/business/services';

@Component({
  selector: 'app-maintenance-mode',
  templateUrl: './maintenance-mode.component.html',
  styleUrls: ['./maintenance-mode.component.css'],
})
export class MaintenanceModeComponent implements OnInit {
  @Input() canRedirect: boolean = true;
  @Input() canNavigate: boolean = true;

  constructor(private router: Router, public auth: AuthenticationService) {}

  ngOnInit() {
    if (this.canRedirect && !this.auth.isInMaintenance)
      this.router.navigate([appConfig.MAIN_ACCOUNT_ROUTE]);
  }
}
