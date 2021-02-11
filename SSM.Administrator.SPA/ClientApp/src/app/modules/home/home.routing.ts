import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SecurityInfoComponent, HelpFaqComponent, LinksComponent } from '.';

export const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'secure/home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'home/security-info',
    component: SecurityInfoComponent,
    data: {
      breadcrumb: 'Sobre Segurança'
    }
  },
  {
    path: 'home/help-faq',
    component: HelpFaqComponent,
    data: {
      breadcrumb: 'Dúvidas Frequentes'
    }
  },
  {
    path: 'home/links',
    component: LinksComponent,
    data: {
      breadcrumb: 'Links'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
