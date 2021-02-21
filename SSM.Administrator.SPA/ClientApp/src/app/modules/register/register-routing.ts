import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from '@app/business/guards';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'register/customer',
    component: CustomerComponent,
    data: {
      breadcrumb: 'Cadastro de Clientes',
    },
  },
  {
    path: 'editar/:id',
    component: CustomerEditComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Editar Clientes',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
