import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';
import * as geojson from 'geojson';
import { GeolocationService } from '../services/geolocation.service';
import { GeolocationPosition } from 'src/shared/interfaces/geolocation.interface';
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

    setTimeout(() => this.map.invalidateSize(), 0);

    this._geoService.getcurrentPosition().then((resp: GeolocationPosition) => {
      const { latitude, longitude } = resp.coords;
      this.map.setView([latitude, longitude]);
    });
  }

}
