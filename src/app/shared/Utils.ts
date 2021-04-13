import * as leaflet from 'leaflet';

export class Utils {

  public static setPinIcon(iconFileName: string): leaflet.Icon {
    return leaflet.icon({
      iconUrl: `/assets/images/map-icons/${iconFileName}.png`,
      iconSize: [30, 42],
      iconAnchor: [0, 30],
      popupAnchor: [15, -20],
    });
  }

}
