import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { CampoControlErroComponent } from './form-validation/campo-control-erro/campo-control-erro.component';
import { ErrorMsgComponent } from './form-validation/error-msg/error-msg.component';
import { InputFieldComponent } from './form-validation/input-field/input-field.component';
import { BaseFormComponent } from './form-validation/base-form/base-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
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
})
export class SharedModule {}
