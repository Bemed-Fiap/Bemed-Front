import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugstorePageRoutingModule } from './drugstore-routing.module';

import { DrugstorePage } from './drugstore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugstorePageRoutingModule
  ],
  declarations: [DrugstorePage]
})
export class DrugstorePageModule {}
