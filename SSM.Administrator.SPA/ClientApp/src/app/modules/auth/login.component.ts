import { Component, OnInit } from '@angular/core';
import { Destroyer } from '@app/core/super-class';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from './login-modal/login-modal/login-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Destroyer implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
    super();
  }

  ngOnInit() {}

  openModal(content: any) {
    const modalOptions = {
      initialState: {
        content: content,
        title: 'Aviso',
        //actAgree: this.onActAgree.bind(this),
        //actNotAgree: this.onActNotAgree.bind(this)
      },
      class: 'modal-dialog-centered',
      keyboard: false,
      ignoreBackdropClick: true,
      backdrop: true,
    };

    this.bsModalRef = this.modalService.show(LoginModalComponent, modalOptions);
  }
}
