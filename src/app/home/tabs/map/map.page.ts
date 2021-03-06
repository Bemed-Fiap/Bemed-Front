import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
import { Utils } from 'src/app/shared/Utils';

import * as leaflet from 'leaflet';

import { GeolocationPosition } from 'src/app/shared/interfaces/geolocation.interface';
import { data as stores } from './drugstore.mock';
import { MapService } from './map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  
  public map: leaflet.Map;

  constructor(private _geoService: GeolocationService,
    private readonly _mapService: MapService) {}

  ngOnInit() {
    this._mapService.getDrugstores().subscribe(res => {
      this._initMap(res);
    });
  }

  private _initMap(drugstoreList: [{}]): void {
    this._tryToGetUserGeolocation();
    this._drawPinsFromDrugstoreList(drugstoreList);
    setTimeout(() => this.map.invalidateSize(), 0);
  }

  private _setTiles(): leaflet.TileLayer {
    return leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
  }

  private _tryToGetUserGeolocation(): void {
    this.map = leaflet.map('map').setView([0, 0], 16);
    this._setTiles().addTo(this.map);

    this._geoService
      .getcurrentPosition()
      .then((resp: GeolocationPosition) => {
        const { longitude, latitude } = resp.coords;

        const userLocation: leaflet.LatLng = leaflet.GeoJSON.coordsToLatLng([
          longitude,
          latitude,
        ]);
        const userIcon = Utils.setPinIcon('user');

        this.map.setView(leaflet.GeoJSON.coordsToLatLng([longitude, latitude]));

        leaflet
          .marker(userLocation, { icon: userIcon })
          .bindPopup('Você está aqui!')
          .addTo(this.map);
      })
      .catch((error) => {
        throw new Error(`Erro ao pegar a localização do usuário, ${error}`);
      });
  }

  private _drawPinsFromDrugstoreList(drugstoreList: [{}]): void {
    for (const drug of drugstoreList) {
      
      const [ longitude, latitude ] = drug['location'];
      
      const { nome, endereco, cep, phone }: any = drug;

      leaflet
        .marker(
          leaflet.GeoJSON.coordsToLatLng(
            [longitude, latitude] as [number, number]
          ),
          { icon: Utils.setPinIcon('drugstore') }
        )
        .bindPopup(
          `<b>${nome}</b><br>${endereco}<br>${cep}<br>${phone}`
        )
        .addTo(this.map);
    }
  }
}
