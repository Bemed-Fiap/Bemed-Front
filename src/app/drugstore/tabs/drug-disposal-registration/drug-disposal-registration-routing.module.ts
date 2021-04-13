import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugDisposalRegistrationPage } from './drug-disposal-registration.page';

const routes: Routes = [
  {
    path: '',
    component: DrugDisposalRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugDisposalRegistrationPageRoutingModule {}
