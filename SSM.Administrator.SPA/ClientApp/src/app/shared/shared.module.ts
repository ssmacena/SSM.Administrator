import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { CampoControlErroComponent } from './form-validation/campo-control-erro/campo-control-erro.component';
import { ErrorMsgComponent } from './form-validation/error-msg/error-msg.component';
import { InputFieldComponent } from './form-validation/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    AlertModalComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AlertModalComponent, ConfirmModalComponent],
})
export class SharedModule {}
