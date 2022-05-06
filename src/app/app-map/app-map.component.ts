import {AfterViewInit, Component, EventEmitter} from '@angular/core';
import * as Leaflet from 'leaflet';
import {GeolocService} from "../geoLoc/geoloc.service";
import {BehaviorSubject} from "rxjs";
import {LeafletEvent} from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.scss']
})
export class AppMapComponent implements AfterViewInit {
  title = 'AngularOSM';
  private map !: Leaflet.Map;
  private circle!: Leaflet.Circle;
  private localPlace!: Leaflet.Circle;
  private eeZoom = new EventEmitter<LeafletEvent>();

  private async initMap(): Promise<void> {
    const postion = await getPosition()
    this.map = Leaflet.map('map', {
      layers: getLayers(),
      zoom: 13,
      center: new Leaflet.LatLng(postion.coords.latitude, postion.coords.longitude)
    });

    console.log(postion)
    this.circle = Leaflet.circle([postion.coords.latitude, postion.coords.longitude], {
      color: 'rgba(69,109,239,0.5)',
      fillColor: 'rgba(89,122,231,0.48)',
      fillOpacity: 0.5,
      radius: 5
    }).addTo(this.map);

    this.localPlace = Leaflet.circle([postion.coords.latitude, postion.coords.longitude], {
      color: 'rgb(0,60,255)',
      fillColor: 'rgb(29,81,252)',
      fillOpacity: 1,
      radius: 2.5
    }).addTo(this.map);


    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    //A modifier pour le radius en fonction du zoom
    this.eeZoom.subscribe((event) => {
      console.log(event)
      var currentZoom = this.map.getZoom();
      if (currentZoom > 6) {
        this.localPlace.setRadius(8);
      } else {
        this.localPlace.setRadius(2);
      }
    });

    this.loc.getLocObs().subscribe((val) => {
      console.log("loc update", val)
      console.log(val.coords.speed)
      this.circle.setLatLng({
        lat: val.coords.latitude,
        lng: val.coords.longitude,
      });
      this.circle.setRadius(val.coords.accuracy);
      this.localPlace.setLatLng({
        lat: val.coords.latitude,
        lng: val.coords.longitude,
      })
    })

    this.map.on('zoomend', this.eeZoom.next,);
  }

  constructor(private loc: GeolocService) {

  }

  ngAfterViewInit(): void {
    this.initMap();
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

export const getPosition = (): Promise<GeolocationPosition> => {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve(position);
    })
  })
}

