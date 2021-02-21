import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Output() customersChanged = new EventEmitter<void>();
  @ViewChild('deletarButton') buttonDeletar;
  @ViewChild('salvarButton') buttonSalvar;
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
    CustomerService.customerWasSelected.subscribe(
      (customerSelected: Customer) => {
        this.selectedCustomer = customerSelected;
        this.initForm();
      }
    );
    //this.buttonDeletar.nativeElement.disabled = true;
    //this.buttonSalvar.nativeElement.disabled = true;
  }

  onSaveCustomer() {
    if (this.customerForm.valid) {
      this.customerService
        .saveCustomer(this.customerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (responseData) => {
            this.customersChanged.emit();
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
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.customerService
        .deleteCustomer(this.selectedCustomer.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (success) => {
            this.onClearForm();
            this.customersChanged.emit();
            this.toastr.success('Registro deletado com sucesso!', 'Cliente');
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
    this.buttonDeletar.nativeElement.disabled = false;
    this.buttonSalvar.nativeElement.disabled = false;
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
    this.buttonDeletar.nativeElement.disabled = true;
  }
}
