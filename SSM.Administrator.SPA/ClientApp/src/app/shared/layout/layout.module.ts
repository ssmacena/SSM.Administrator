import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 3rd party
import { BreadcrumbModule } from 'angular-crumbs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

//core app
import { SafeHtml } from '@app/core/pipes';
import { NegativeNumberPipe } from '@app/core/pipes';

import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { ScrollUpComponent } from './scroll-up/scroll-up.component';
import { PanelComponent } from './panel/panel.component';
// import { ExportContentComponent } from './export-content/export-content.component';
// import { InteractveMessageComponent } from './interactve-message/interactve-message.component';
// import { InteractveMessageModalComponent } from './interactve-message/interactve-message-modal/interactve-message-modal.component';
import { JoyrideButtonPrevComponent } from './joyride-tour-custom/joyride-button-prev/joyride-button-prev.component';
import { JoyrideButtonNextComponent } from './joyride-tour-custom/joyride-button-next/joyride-button-next.component';
import { JoyrideButtonDoneComponent } from './joyride-tour-custom/joyride-button-done/joyride-button-done.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaintenanceModeComponent } from './maintenance-mode/maintenance-mode.component';

@NgModule({
  declarations: [
    //Pipes
    SafeHtml,
    NegativeNumberPipe,

    //Components
    HeaderComponent,
    NavComponent,
    FooterComponent,
    BreadcrumbComponent,
    LoadingScreenComponent,
    ScrollUpComponent,
    PanelComponent,
    //ExportContentComponent,
    //InteractveMessageComponent,
    //InteractveMessageModalComponent,
    JoyrideButtonPrevComponent,
    JoyrideButtonNextComponent,
    JoyrideButtonDoneComponent,
    PageNotFoundComponent,
    MaintenanceModeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    // 3rd party
    BreadcrumbModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    //JoyrideModule.forRoot(),
  ],
  exports: [
    CommonModule,
    RouterModule,

    // 3rd party
    BreadcrumbModule,
    BsDropdownModule,
    TooltipModule,

    //layout party
    LoadingScreenComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    BreadcrumbComponent,
    ScrollUpComponent,
    PanelComponent,
    //ViewProductSelectComponent,
    //ExportContentComponent,
    //InteractveMessageComponent,
    //InteractveMessageModalComponent,
    JoyrideButtonPrevComponent,
    JoyrideButtonNextComponent,
    JoyrideButtonDoneComponent,
    MaintenanceModeComponent,
  ],
})
export class LayoutModule {}
