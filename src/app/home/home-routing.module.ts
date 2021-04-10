import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./tabs/home/home.module').then( m => m.HomePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'wallet',
        loadChildren: () => import('./tabs/wallet/wallet.module').then( m => m.WalletPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'map',
        loadChildren: () => import('./tabs/map/map.module').then( m => m.MapPageModule),
        canActivate: [AuthGuard]
      }, {
        path: '',
        redirectTo: 'home'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
