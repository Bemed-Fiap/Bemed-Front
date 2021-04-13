import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable()
export class GeolocationService {
  constructor(private _geolocation: Geolocation) {}

  public getcurrentPosition(): Promise<any> {
    return this._geolocation
      .getCurrentPosition()
  }
}
