import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }

  canActivate(): boolean {
    if (this.auth.isInMaintenance) {
      this.router.navigate(['account/maintenance']);
    }

    return !this.auth.isInMaintenance  }
}
