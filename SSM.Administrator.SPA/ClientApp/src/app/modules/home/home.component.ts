import { LoginModalComponent } from './pages/auth/login-modal/login-modal.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { appConfig } from '@app/app-config';
import { Destroyer } from '@app/core/super-class';
import { AuthenticationService } from '@app/business/services';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

export interface AuthResponseData {
  email: string;
  token: string;
  expiresIn: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends Destroyer implements OnInit {
  bsModalRef: BsModalRef;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  error = '';

  constructor(
    private modalService: BsModalService,
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
    //this.returnUrl = this.route.snapshot.paramMap.get('returnUrl')!;
    //this.openModalWithComponent();

    let authObs: Observable<AuthResponseData>;

    authObs = this.auth.login('silviomacena@gmail.com', '4ej@Fp#i');

    authObs.subscribe(
      (resData) => {
        console.log(resData);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  }

  login() {
    this.router.navigate([appConfig.MAIN_ACCOUNT_ROUTE], {
      queryParams: { returnUrl: this.returnUrl },
    });
  }

  onSubmit() {
    // if (!form.valid) {
    //   return;
    // }
    // const email = form.value.email;
    // const password = form.value.password;

    console.log('chegou');
  }

  public onCancel(): void {
    this.bsModalRef.hide();
  }

  openModalWithComponent() {
    // const modalOptions = {
    //   initialState: {
    //     //content: content,
    //     title: 'Aviso',
    //     invalidForm: this.onSubmit.bind(this),
    //     //actCancel: this.onCancel.bind(this),
    //   },
    //   class: 'modal-dialog-centered',
    //   keyboard: false,
    //   ignoreBackdropClick: true,
    //   backdrop: true,
    // };

    const initialState = {
      title: 'Modal with component',
      content: 'Modal content',
      ignoreBackdropClick: true,
      keyboard: false,
    };

    this.bsModalRef = this.modalService.show(LoginModalComponent, {
      initialState,
    });
    //this.bsModalRef.content.closeBtnName = 'Close';

    // this.bsModalRef.content.event.subscribe((res) => {
    //   console.log(res.data);
    // });
  }
}
