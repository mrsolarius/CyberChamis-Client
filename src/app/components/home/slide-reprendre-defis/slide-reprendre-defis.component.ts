import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeolocService,getDistance} from "../../../services/geoloc.service";
import {lastValueFrom} from "rxjs";
import {VisiteDto} from "../../../apis/api-local/models/visite-dto";
import {GameRestControllerService} from "../../../apis/api-local/services/game-rest-controller.service";

@Component({
  selector: 'app-slide-reprendre-defis',
  templateUrl: './slide-reprendre-defis.component.html',
  styleUrls: ['./slide-reprendre-defis.component.scss']
})
export class SlideReprendreDefisComponent implements OnInit {
  @Input() visites!:VisiteDto[];
  @Output() abandonJeux = new EventEmitter<void>();
  constructor(private geolocService: GeolocService, private gameService : GameRestControllerService) {
  }

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
  trackById(index: number, e:any): number {
    return e.index;
  }
  async abandon(idVisite:number) {
    await lastValueFrom(this.gameService.editStatus({visiteId: idVisite, status: "ABONDON"}));
    this.abandonJeux.emit();
  }


}
