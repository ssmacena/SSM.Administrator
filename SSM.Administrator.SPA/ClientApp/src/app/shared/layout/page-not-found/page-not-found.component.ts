import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@app/business/services';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(public auth: AuthenticationService) {}

  ngOnInit() {}
}
