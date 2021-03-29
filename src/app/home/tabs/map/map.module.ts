import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';
import { HeaderPageModule } from '../components/header/header.module';

import { MapPage } from './map.page';

import { GeolocationService } from '../services/geolocation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [MapPage],
  providers: [
    GeolocationService
  ]
})
export class MapPageModule {}
