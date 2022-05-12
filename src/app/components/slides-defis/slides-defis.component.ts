import { Component, Input, OnInit } from '@angular/core';
import { DefiDto } from 'src/app/api/models';
import {GeolocService, getDistance} from "../../geoLoc/geoloc.service";
@Component({
  selector: 'app-slides-defis',
  templateUrl: './slides-defis.component.html',
  styleUrls: ['./slides-defis.component.scss']
})
export class SlidesDefisComponent implements OnInit {
  @Input() defis!: DefiDto[];


  constructor(private geolocService: GeolocService) { }

  ngOnInit(): void {
  }

  getDistance(latitude: number, longitude: number, latitude2: number, longitude2: number) {
    return getDistance(latitude, longitude, latitude2, longitude2);
  }

  getLocObs(){
    return this.geolocService.getLocObs();
  }

  checkIfNote(noteMoyenne: number) {
    return noteMoyenne > 0 || !isNaN(noteMoyenne);
  }
}
