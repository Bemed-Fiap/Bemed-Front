import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';
import * as geojson from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public map: leaflet.Map;

  constructor() { }

  ngOnInit() {
    this._initMap();
  }

  private _initMap(): void {
    this.map = leaflet.map("map").setView([-23.929059545589364, -46.38076761434102], 16)


    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    setTimeout(() => this.map.invalidateSize(), 0);
  }

}
