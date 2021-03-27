import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import * as geojson from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public map: Leaflet.Map;

  constructor() { }

  ngOnInit() {
    this._initMap();
  }

  private _initMap(): void {

    const userLocation: Leaflet.LatLng = Leaflet.GeoJSON.coordsToLatLng([-46.655309, -23.562669]);

    const drugstores = [
      {nome: 'Farma 1', endereço: 'Rua 1, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.657819747924805, -23.562020273063425]},
      {nome: 'Farma 2', endereço: 'Rua 2, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.65436506271362, -23.564931208577853]},
      {nome: 'Farma 3', endereço: 'Rua 3, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.66174650192261, -23.56361342819343]},
      {nome: 'Farma 4', endereço: 'Rua 4, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.658034324645996, -23.564164143991764]},
      {nome: 'Farma 5', endereço: 'Rua 5, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.65814161300659, -23.560112395203813]},
      {nome: 'Farma 6', endereço: 'Rua 6, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.653828620910645, -23.563180721303738]},
      {nome: 'Farma 7', endereço: 'Rua 7, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.65020227432251, -23.566327647991482]},
      {nome: 'Farma 8', endereço: 'Rua 8, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.65372133255005, -23.561115509697213]},
      {nome: 'Farma 9', endereço: 'Rua 9, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.65191888809204, -23.561764579700224]},
      {nome: 'Farma 10', endereço: 'Rua 10, pipipi popoó', cep: '12345-678', phone: '(11) 1234-5678', location: [-46.65024518966675, -23.563102047170666]}
    ];

    const userIcon = this._constructIcon('user');

    this.map = Leaflet.map("map").setView(userLocation, 15);

    Leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
      .addTo(this.map);

    Leaflet
      .marker(userLocation, { icon: userIcon })
      .addTo(this.map);

      drugstores.forEach(drugstore => {
      Leaflet
        .marker(Leaflet.GeoJSON.coordsToLatLng(drugstore.location as [number, number]), { icon: this._constructIcon('drugstore') })
        .bindPopup(`<b>${drugstore.nome}</b><br>${drugstore.endereço}<br>${drugstore.cep}<br>${drugstore.phone}`)
        .addTo(this.map);
    });

    setTimeout(() => this.map.invalidateSize(), 10);
  }

  private _constructIcon(iconFileName: string): Leaflet.Icon {
    return Leaflet.icon({
      iconUrl: `/assets/images/map-icons/${iconFileName}.png`,
      iconSize: [30, 42],
      iconAnchor: [0, 30],
      popupAnchor: [15, -20]
    });
  }

}
