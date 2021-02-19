import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthenticationService,
  AuthResponseData,
} from '@app/business/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  @ViewChild('autoShownModal', { static: false })
  autoShownModal: ModalDirective;
  isModalShown = false;

  title: string;
  closeBtnName: string;
  content: string;

  authForm: FormGroup;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
    });
    this.isModalShown = true;
  }

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  onPostFormSubmit() {
    let postData = {
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value,
    };

    let authObs: Observable<AuthResponseData>;

    authObs = this.auth.login(
      this.authForm.get('email')?.value,
      this.authForm.get('password')?.value
    );

    authObs.subscribe(
      (resData) => {
        console.log(resData);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    if (postData != null) {
      this.event.emit('OK');
      this.bsModalRef.hide();
    }
  }

  onClose() {
    this.bsModalRef.hide();
  }

  // triggerEvent(item: string) {
  //   this.event.emit({ data: item, res: 200 });
  // }

  onSubmit(value: string) {
    if (!this.authForm.valid) {
      const email = this.authForm.get('email');
      const password = this.authForm.get('password');
    }
  }
  // invalidForm(): boolean {
  //   return !(this.authForm && this.authForm.valid);
  // }

  // public onCancel(): void {
  //   this.onClose.next(false);
  //   this.bsModalRef.hide();
  // }
}
