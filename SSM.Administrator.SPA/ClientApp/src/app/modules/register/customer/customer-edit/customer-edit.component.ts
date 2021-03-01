import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@app/business/models';
import { CustomerService } from '@app/business/services/customer.service';
import { ErrorHelper } from '@app/core/helpers';
import { AlertModalService } from '@app/core/services/alert-modal.service';

import { BaseFormComponent } from '@app/shared/form-validation/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, Subscription } from 'rxjs';
import {
  catchError,
  map,
  share,
  takeUntil,
  first,
  take,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent
  extends BaseFormComponent
  implements OnInit, OnChanges {
  @Output() customersChangedEvent = new EventEmitter<void>();
  @Output() resetFormEvent = new EventEmitter<void>();
  @Input() idCustomer: number = 0;
  @ViewChild('deletarButton') buttonDeletar;
  @ViewChild('salvarButton') buttonSalvar;
  subscription: Subscription;
  selectedCustomer: Customer;
  customer$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private alertService: AlertModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    let change = changes['idCustomer'];

    if (!change.firstChange && change.currentValue != 0) this.getCustomerById();
  }

  submit() {
    if (this.abstractForm.valid) {
      this.customerService
        .saveCustomer(this.abstractForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (responseData) => {
            this.customersChangedEvent.emit();
            this.toastr.success(
              'Registro do cliente salvo com sucesso!',
              'Cliente'
            );
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

  onDeleteCustomer() {
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja excluir este cliente?'
    );
    result$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.customerService.deleteCustomer(this.selectedCustomer.id)
            : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.onClearForm();
          this.customersChangedEvent.emit();
          this.toastr.success('Registro deletado com sucesso!', 'Cliente');
        },
        (error) => {
          this.toastr.error(error.message, ErrorHelper.raiseDefaultErrorTitle);
        }
      );
  }

  onClearForm() {
    this.abstractForm.patchValue({
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
    this.resetFormEvent.emit();
    this.buttonDeletar.nativeElement.disabled = true;
  }

  private getCustomerById() {
    this.subscription = this.customerService
      .getCustomerById(this.idCustomer)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (responseData) => {
          this.selectedCustomer = responseData;
          this.populateFields();
          return responseData;
        },
        (error) => {
          this.toastr.error(error.message, ErrorHelper.raiseDefaultErrorTitle);
        }
      );
  }

  private populateFields() {
    this.abstractForm.patchValue({
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
    this.buttonDeletar.nativeElement.disabled = false;
    this.buttonSalvar.nativeElement.disabled = false;
  }

  private initializeForm() {
    this.abstractForm = this.formBuilder.group({
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
  }
}
