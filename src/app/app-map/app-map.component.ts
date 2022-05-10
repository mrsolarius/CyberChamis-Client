import {AfterViewInit, Component, Input} from '@angular/core';
import * as Leaflet from 'leaflet';
import {GeolocService} from "../geoLoc/geoloc.service";
import {BehaviorSubject, debounceTime, firstValueFrom, lastValueFrom} from "rxjs";
import {DefiDto} from "../api/models/defi-dto";
import {DefiRestControllerService} from "../api/services/defi-rest-controller.service";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {ArretDto} from "../api/models/arret-dto";

@Component({
  selector: 'app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.scss']
})
export class AppMapComponent implements AfterViewInit {

  defi:BehaviorSubject<DefiDto[]> = new BehaviorSubject<DefiDto[]>([]);
  title = 'AngularOSM';
  private map !: Leaflet.Map;
  private circle!: Leaflet.Circle;
  private localPlace!: Leaflet.Circle;

  private isInit=false;

  // Clusturing
  markerClusterGroup!: Leaflet.MarkerClusterGroup;
  markerClusterData = [];
  markers:Leaflet.MarkerClusterGroup;

  marker!:any;

  constructor(
    private loc: GeolocService,
    private defisRest : DefiRestControllerService,) {
    this.markers = Leaflet.markerClusterGroup({removeOutsideVisibleBounds: true});
  }

  ngOnInit () {

  }

  isNonNull<T>(value: T): value is NonNullable<T> {
    return value != null && typeof value !== "undefined";
  }

  private async initMap(): Promise<void> {
    const postion = await getPosition()
    this.map = Leaflet.map('map', {
      layers: getLayers(),
      zoom: 16,
      center: new Leaflet.LatLng(postion.coords.latitude, postion.coords.longitude),
      minZoom: 2
    });
    //markers.addLayers(mList);
    //this.map.addLayer(this.markerClusterGroup);
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
    this.initMap().then(()=>{
      this.defisRest.getDefis().pipe(filter(this.isNonNull)).subscribe((v)=>{
        this.defi.next(v);
        const greenIcon = Leaflet.icon({
          iconUrl: 'assets/placeholder.png',
          iconSize:     [30, 55], // size of the icon
          //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
          popupAnchor:  [-3, -60] // point from which the popup should open relative to the iconAnchor
        });
        const markerClusterGroup = Leaflet.markerClusterGroup({ chunkedLoading: true})
        const mList = []
        for(let d of v){
          const arretDto :ArretDto = d.arretDTO!;
          mList.push(Leaflet.marker([arretDto.longitude!,arretDto.latitude!],{icon:greenIcon}).bindPopup(d.titre!));
        }
        console.log('list',mList)
        console.log('map',this.map)

        markerClusterGroup.addLayers(mList);
        this.map.addLayer(markerClusterGroup);
      });
    });
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

