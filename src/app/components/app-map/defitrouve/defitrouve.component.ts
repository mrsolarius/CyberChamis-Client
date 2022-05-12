import {Component, Input, OnInit} from '@angular/core';
import {DefiDto} from "../../../apis/api-local/models/defi-dto";
import {ArretDto} from "../../../apis/api-local/models/arret-dto";
import {Observable} from "rxjs";
import {GeolocService} from "../../../services/geoloc.service";

@Component({
  selector: 'app-defitrouve',
  templateUrl: './defitrouve.component.html',
  styleUrls: ['./defitrouve.component.scss']
})
export class DefitrouveComponent implements OnInit {
  @Input() defi!: DefiDto;
  geoloc: Observable<GeolocationPosition>;
  constructor(private geolocService: GeolocService) { this.geoloc = this.geolocService.getLocObs()}

  ngOnInit(): void {
  }


  getNomArret(arret : ArretDto | undefined) {
    if(arret){
      if(arret.nomArret)
        return arret.nomArret;
      else
        return undefined;
    }else
      return undefined;
  }
  deg2rad(deg : number) {
    return deg * (Math.PI/180)
  }
  getDistance(geoloc : GeolocationPosition){
    const R = 6371; // Radius of the earth in km
    const lat2 = this.defi.arretDTO?.latitude;
    const lon2 = this.defi.arretDTO?.longitude;
    const lat1 = geoloc.coords.latitude;
    const lon1 = geoloc.coords.longitude;
    if(lat2 && lon2){
      const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return Math.round(d);
    }
    return "?";
  }
}
