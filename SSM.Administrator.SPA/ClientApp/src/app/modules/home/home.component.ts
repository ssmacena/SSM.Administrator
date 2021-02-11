import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { appConfig } from '@app/app-config';
import { Destroyer } from '@app/core/super-class';
import { AuthenticationService } from '@app/business/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends Destroyer implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public auth: AuthenticationService
  ) {
    super();
    this.loginForm = this.formBuilder.group({});
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.toastr.success('Download realizado com sucesso!', 'Download');
    this.returnUrl = this.route.snapshot.paramMap.get('returnUrl')!;
  }

  login() {
    this.router.navigate([appConfig.MAIN_ACCOUNT_ROUTE], {
      queryParams: { returnUrl: this.returnUrl },
    });
  }
}
