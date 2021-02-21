import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@app/business/models';
import { CustomerService } from '@app/business/services/Customer.service';
import { ErrorHelper } from '@app/core/helpers';
import { Destroyer } from '@app/core/super-class';
import { ToastrService } from 'ngx-toastr';
import { empty, Observable } from 'rxjs';
import { catchError, map, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent extends Destroyer implements OnInit {
  @Input() customerId: number;
  editMode = false;
  customerForm: FormGroup;
  selectedCustomer: Customer;
  customer$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      emailConfirmar: [null, [Validators.required]],
      cep: [null, [Validators.required, Validators.maxLength(15)]],
      rua: [null, [Validators.required]],
      numeroEndereco: [null],
      complemento: [null],
      bairro: [null, [Validators.required]],
      siglaEstado: [null, [Validators.required, Validators.maxLength(5)]],
      cidade: [null, [Validators.required]],
    });
    console.log('ngOnInit: CustomerEditComponent');
    CustomerService.customerWasSelected.subscribe(
      (customerSelected: Customer) => {
        this.selectedCustomer = customerSelected;
        this.initForm();
      }
    );
  }

  onSaveCustomer() {
    console.log(this.customerForm.value);
    console.log(this.customerForm.valid);
    if (this.customerForm.valid) {
      console.log('submit');
      this.customerService
        .saveCustomer(this.customerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (responseData) => {
            return responseData;
          },
          (error) => {
            this.toastr.error(
              error.message,
              ErrorHelper.raiseDefaultErrorTitle
            );
          }
        );
    }
  }

  onDeleteCustomer() {}

  private initForm() {
    this.customerForm.patchValue({
      id: this.selectedCustomer.id,
      nome: this.selectedCustomer.nome,
      email: this.selectedCustomer.email,
      emailConfirmar: this.selectedCustomer.emailConfirmar,
      cep: this.selectedCustomer.cep,
      numeroEndereco: this.selectedCustomer.numeroEndereco,
      complemento: this.selectedCustomer.complemento,
      rua: this.selectedCustomer.rua,
      bairro: this.selectedCustomer.bairro,
      siglaEstado: this.selectedCustomer.siglaEstado,
      cidade: this.selectedCustomer.cidade,
    });
  }

  onClearForm() {
    this.customerForm.patchValue({
      id: 0,
      nome: null,
      email: null,
      emailConfirmar: null,
      cep: null,
      numeroEndereco: null,
      complemento: null,
      rua: null,
      bairro: null,
      siglaEstado: null,
      cidade: null,
    });
  }
}
