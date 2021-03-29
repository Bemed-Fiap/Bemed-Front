import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
import { Utils } from 'src/app/shared/Utils';

import * as leaflet from 'leaflet';
import { GeolocationPosition } from 'src/app/shared/interfaces/geolocation.interface';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public map: leaflet.Map;

  constructor(private _geoService: GeolocationService) { }

  ngOnInit() {
    this._initMap();
  }

  private _initMap(): void {
    this.map = leaflet.map("map").setView([0, 0], 16)
    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this._tryToGetUserGeolocation();
    setTimeout(() => this.map.invalidateSize(), 0);    
  }

  private _tryToGetUserGeolocation(): void {
    this._geoService.getcurrentPosition().then((resp: GeolocationPosition) => {
      const { longitude, latitude } = resp.coords;

      const userLocation: leaflet.LatLng = leaflet.GeoJSON.coordsToLatLng([longitude, latitude]);
      const userIcon = Utils.setPinIcon('user');

      this.map.setView(leaflet.GeoJSON.coordsToLatLng([longitude, latitude]));

      leaflet
        .marker(userLocation, { icon: userIcon })
        .bindPopup('Você está aqui!')
        .addTo(this.map);
    });    
  }

}
