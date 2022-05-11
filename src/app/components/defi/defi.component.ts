import {DefiDto} from "../../api/models/defi-dto";
import {Component, Input, OnInit} from '@angular/core';
import {ArretDto} from "../../api/models/arret-dto";
import {GeolocService} from "../../geoLoc/geoloc.service";
import {Observable} from "rxjs";
type Star = "star" | "star_border" | "star_half";

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss']
})
export class DefiComponent implements OnInit{
  @Input('defi') defi! : DefiDto;
  geoloc !: Observable<GeolocationPosition>;

  constructor(private geolocService: GeolocService) {
  }

  getStar(note: number): Star[] {
    const arr = Array(5).fill("star_border");
    return arr.map((star, index) => {
      if (note>=index+0.25 && note<=index+0.75) {
        return "star_half";
      }else if (index+1 <= note+0.75) {
        return "star";
      }else{
        return "star_border";
      }
    });
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

  ngOnInit(): void {
    this.geoloc = this.geolocService.getLocObs();
  }
}
