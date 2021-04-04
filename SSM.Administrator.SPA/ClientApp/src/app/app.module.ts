import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
} from '@angular/core';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 3rd party
import { BreadcrumbModule } from 'angular-crumbs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

// core & shared
import { SharedModule } from '@app/shared';
import {
  JwtInterceptor,
  ErrorInterceptor,
  LoadingScreenInterceptor,
} from './core/interceptors';

// features
import { HomeModule } from './modules/home/home.module';
import { RegisterModule } from './modules/register/register.module';
import { HttpXSRFInterceptor } from './core/interceptors/xsrf.interceptor';
import { WithCredentialsInterceptorService } from './core/interceptors/with-credentials-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),

    // 3rd party
    BreadcrumbModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    ToastContainerModule,
    //JoyrideModule.forRoot(),

    // core & shared
    SharedModule,

    // features
    HomeModule,
    RegisterModule,

    // app
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXSRFInterceptor,
      multi: true,
    },
    //{ provide: HttpXsrfTokenExtractor, useClass: HttpXSRFInterceptor },
    //{ provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
    //{ provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
