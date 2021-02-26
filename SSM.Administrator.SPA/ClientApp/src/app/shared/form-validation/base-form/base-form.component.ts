import { Component, OnInit, Directive } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseFormComponent implements OnInit {
  abstractForm: FormGroup;

  constructor() {}

  ngOnInit() {}

  abstract submit();

  onSubmit() {
    if (this.abstractForm.valid) {
      this.submit();
    } else {
      console.log('formulario invalido');
      this.markControlsDirty(this.abstractForm);
    }
  }

  markControlsDirty(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      console.log(key);
      const abstractControl = formGroup.controls[key];
      abstractControl.markAsDirty();
      abstractControl.markAsTouched();
      if (
        abstractControl instanceof FormGroup ||
        abstractControl instanceof FormArray
      ) {
        this.markControlsDirty(abstractControl);
      }
    });
  }

  checkValidTouched(key: string) {
    const abstractControl = this.abstractForm.controls[key];
    if (abstractControl instanceof FormGroup) {
      return (
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      );
    }
    return false;
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.checkValidTouched(campo),
      'has-feedback': this.checkValidTouched(campo),
    };
  }
}
