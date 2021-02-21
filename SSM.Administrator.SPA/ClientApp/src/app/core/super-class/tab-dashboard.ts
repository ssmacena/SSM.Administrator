import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Injectable,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Destroyer } from './destroyer';
import { MenuDashboardService } from '../services';

@Component({
  template: '',
})
export class TabDashBoard extends Destroyer {
  @ViewChild('tabSet') tabSet: TabsetComponent;
  @Output() selectedTab: EventEmitter<string> = new EventEmitter<string>();

  navigationSubscription$: Subscription;

  currentRoute: string;
  TabNameIndex = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private menuService: MenuDashboardService
  ) {
    super();

    //subscribe to the router events. Store the subscription so we can
    //unsubscribe later.
    this.navigationSubscription$ = this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.currentRoute = this.getCurrentRouteWhitoutParameters(e.url);
          const tabName = this.route.snapshot.paramMap.get('tab');
          this.onSelectTab(tabName !== null ? tabName : '');
        }
      });
  }
  onSelectTab(tabId: string) {
    let tabIndex = this.TabNameIndex[tabId];

    //update url location
    let url = `${this.currentRoute}/${tabId}`;
    this.location.go(url);

    if (this.tabSet && this.tabSet.tabs) {
      let tab = this.tabSet.tabs[tabIndex];
      if (tab) tab.active = true;
    }

    //raise subscriptions
    this.selectedTab.emit(tabId);
    this.menuService.changed$.next(url);
  }

  getCurrentRouteWhitoutParameters(url: string) {
    return url.substring(0, url.lastIndexOf('/'));
  }
}
