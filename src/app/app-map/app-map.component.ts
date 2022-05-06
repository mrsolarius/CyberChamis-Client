import {AfterViewInit, Component} from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.scss']
})
export class AppMapComponent implements AfterViewInit {
  title = 'AngularOSM';
  private map !: Leaflet.Map;
  private circle!: Leaflet.Circle;

  private async initMap(): Promise<void> {


    const postion = await getPosition()
    this.map = Leaflet.map('map', {
      layers: getLayers(),
      zoom: 13,
      center: new Leaflet.LatLng(postion.coords.latitude,postion.coords.longitude)
    });

    navigator.geolocation.watchPosition(this.updatePosition);

    console.log(postion)
    this.circle = Leaflet.circle([postion.coords.latitude,postion.coords.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 1
    }).addTo(this.map);


    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  updatePosition(newPost:GeolocationPosition){
    console.log('new position')
    console.log(newPost)
    this.circle.setLatLng({
      lat:newPost.coords.latitude,
      lng:newPost.coords.longitude
    })
  }


 }

  export const
  getLayers = (): Leaflet.Layer[] => {
    return [
      new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      } as Leaflet.TileLayerOptions),
    ] as Leaflet.Layer[];
  }

  export const getPosition = ():Promise<GeolocationPosition>=>{
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve(position);
    })
  })
}

