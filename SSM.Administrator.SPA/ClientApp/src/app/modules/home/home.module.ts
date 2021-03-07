import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
//// 3rd party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// core & shared
import { SharedModule } from '@app/shared';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { LoginModalComponent } from './pages/auth/login-modal/login-modal.component';
import { SecurityInfoComponent, HelpFaqComponent, LinksComponent } from '.';

@NgModule({
  declarations: [
    HomeComponent,
    SecurityInfoComponent,
    HelpFaqComponent,
    LinksComponent,
    LoginModalComponent,
  ],
  imports: [
    // angular
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    // 3rd party
    NgbModule,
    // core & shared
    SharedModule,

    HomeRoutingModule,
  ],
  entryComponents: [LoginModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [BsModalRef],
})
export class HomeModule {}
