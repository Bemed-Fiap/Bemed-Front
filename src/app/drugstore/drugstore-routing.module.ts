import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { DrugstorePage } from './drugstore.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'disposal-registration',
    component: DrugstorePage
  },
  {
    path: 'disposal-registration',
    loadChildren: () => import('./tabs/drug-disposal-registration/drug-disposal-registration.module').then( m => m.DrugDisposalRegistrationPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugstorePageRoutingModule {}
