import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

//// 3rd party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// core & shared
import { SharedModule } from '@app/shared';
import { SecurityInfoComponent, HelpFaqComponent, LinksComponent } from '.';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent,
    SecurityInfoComponent,
    HelpFaqComponent,
    LinksComponent,
  ],
  imports: [
    // angular
    ReactiveFormsModule,

    // 3rd party
    NgbModule,
    // core & shared
    SharedModule,

    HomeRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
