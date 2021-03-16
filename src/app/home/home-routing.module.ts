import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./tabs/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('./tabs/wallet/wallet.module').then( m => m.WalletPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./tabs/map/map.module').then( m => m.MapPageModule)
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
