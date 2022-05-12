import {Component, Input, OnInit} from '@angular/core';
import {DefiDto} from "../../api/models/defi-dto";
import {GeolocService} from "../../geoLoc/geoloc.service";

@Component({
  selector: 'app-slide-reprendre-defis',
  templateUrl: './slide-reprendre-defis.component.html',
  styleUrls: ['./slide-reprendre-defis.component.scss']
})
export class SlideReprendreDefisComponent implements OnInit {
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
