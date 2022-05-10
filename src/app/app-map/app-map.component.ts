import {AfterViewInit, Component} from '@angular/core';
import * as Leaflet from 'leaflet';
import {GeolocService} from "../geoLoc/geoloc.service";

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
  // Clusturing
  //markerClusterGroup!: Leaflet.MarkerClusterGroup;
  markerClusterData = [];
  markers:Leaflet.MarkerClusterGroup;

  marker!:any;
  constructor(private loc: GeolocService) {
    this.markers = Leaflet.markerClusterGroup({removeOutsideVisibleBounds: true});
  }

  ngOnInit () {
  }


  private async initMap(): Promise<void> {
    const postion = await getPosition()
    this.map = Leaflet.map('map', {
      layers: getLayers(),
      zoom: 16,
      center: new Leaflet.LatLng(postion.coords.latitude, postion.coords.longitude),
      minZoom: 2
    });
    let greenIcon = Leaflet.icon({
      iconUrl: 'assets/placeholder.png',

      iconSize:     [30, 55], // size of the icon
      //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    let markers = Leaflet.markerClusterGroup({ chunkedLoading: true});
    markers.addLayer(Leaflet.marker([45.188559,5.794524],{ title: 'p1' }));
    const mList=[]
    mList.push(Leaflet.marker([45.188528,5.724525], {icon :greenIcon}).bindPopup('defi1'));
    mList.push(Leaflet.marker([45.188521,5.724526],{title: 'p3'}).bindPopup('p3'));
    mList.push(Leaflet.marker([45.188522,5.724527],{title: 'p4'}).bindPopup('p4'));
    mList.push(Leaflet.marker([45.188523,5.724526],{title: 'p5'}).bindPopup('p5'));
    mList.push(Leaflet.marker([45.188524,5.784525],{title: 'p6'}).bindPopup('p6'));
    mList.push(Leaflet.marker([45.188888,5.744525],{title: 'p7'}).bindPopup('p7'));
    mList.push(Leaflet.marker([45.188526,5.764526],{title: 'p8'}).bindPopup('p8'));
    mList.push(Leaflet.marker([45.188527,5.744524],{title: 'p9'}).bindPopup('p9'));
    mList.push(Leaflet.marker([45.188510,5.784524],{title: 'p10'}).bindPopup('p10'));
    mList.push(Leaflet.marker([45.188529,5.734524],{title: 'p11'}).bindPopup('p11'));
    mList.push(Leaflet.marker([45.188539,5.724524],{title: 'p12'}).bindPopup('p12'));
    mList.push(Leaflet.marker([45.188549,5.774524],{title: 'p13'}).bindPopup('p132'));

    markers.addLayers(mList);
    //console.log(markers.getChildCount());
    this.map.addLayer(markers);

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
      maxZoom: 5,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);


    const update = () => this.setRadius();

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

    update();
    this.map.on('zoomend', update);
  }

  setRadius(){
    if (this.map.getZoom()<=3)
      this.localPlace.setRadius(50000)
    else if (this.map.getZoom()<6)
      this.localPlace.setRadius(10000)
    else if (this.map.getZoom()<7)
      this.localPlace.setRadius(8000)
    else if (this.map.getZoom()<8)
      this.localPlace.setRadius(5000)
    else if (this.map.getZoom()<9)
      this.localPlace.setRadius(1000)
    else if (this.map.getZoom()<10)
      this.localPlace.setRadius(500)
    else if (this.map.getZoom()<12)
      this.localPlace.setRadius(100)
    else if (this.map.getZoom()<14)
      this.localPlace.setRadius(50)
    else if (this.map.getZoom()<16)
      this.localPlace.setRadius(10)
    else
      this.localPlace.setRadius(2.5)
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

