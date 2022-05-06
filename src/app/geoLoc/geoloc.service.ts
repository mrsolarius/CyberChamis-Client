import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export type Loc = GeolocationPosition|GeolocationPositionError;

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
    if (toBeDetermined as GeolocationPosition){
      return true
    }
    return false;
  }


}
