import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export type Loc = GeolocationPosition|GeolocationPositionError;

function deg2rad(deg : number) {
  return deg * (Math.PI/180)
}

export function getDistance(lat1 : number, lon1 : number, lat2 : number, lon2 : number) {
  const R = 6371; // Radius of the earth in km
  if(lat2 && lon2){
    const dLat =deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d);
  }
  return "?";
}
@Injectable({
  providedIn: 'root'
})
export class GeolocService {
  private geoLoc = new BehaviorSubject<GeolocationPosition>({
    coords:{
      accuracy:-1,
      longitude:-1,
      latitude:-1,
      speed:-1,
      altitude:-1,
      altitudeAccuracy:-1,
      heading:-1
    },
    timestamp:-1
  });

  constructor() {
    navigator.geolocation.watchPosition((val)=>this.geoLoc.next(val),console.error,{enableHighAccuracy:true,maximumAge:5000})
  }

  getLocObs(): Observable<GeolocationPosition>{
    return this.geoLoc.asObservable();
  }

  isGeolocPos(toBeDetermined: any): toBeDetermined is GeolocationPosition {
    return !!(toBeDetermined as GeolocationPosition);

  }


}
