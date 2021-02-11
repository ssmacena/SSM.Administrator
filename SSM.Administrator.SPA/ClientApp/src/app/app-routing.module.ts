import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './shared/layout';

const routes: Routes = [
  // Fallback when no prior routes is matched
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: false,
      enableTracing: false,  // <-- debugging purposes only
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
