import {Component} from '@angular/core';
import {fadeAnimation} from "../../../animations/fadeAnimation";
import {PlayServiceService} from "../../../services/play-service.service";
import {Observable} from "rxjs";
import {EtapeDto} from "../../../api/models/etape-dto";
import {VisiteDto} from "../../../api/models/visite-dto";
import {IndiceDto} from "../../../api/models/indice-dto";
import {DefiDto} from "../../../api/models/defi-dto";

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss'],
  animations:[fadeAnimation]
})
export class GameLayoutComponent {


  constructor(private gameService:PlayServiceService) { }

  get getObsEtape() : Observable<EtapeDto>{
    return this.gameService.getObsEtape;
  }

  get getObsVisite() : Observable<VisiteDto>{
    return this.gameService.getObsVisite;
  }

  get getObsIndices() : Observable<IndiceDto[]>{
    return this.gameService.getObsIndices;
  }


  getTotalStep(defi: DefiDto | undefined) {
    if(defi?.etapes) {
      if (defi.etapes) {
        return defi.etapes.length;
      }
    }
    return 1;
  }

  getCurrentStepNumber(etap : EtapeDto | undefined){
    if (etap) {
      if (etap.numero) {
        return etap.numero +1
      }
    }
    return 1;
  }

  getCurrentStepTitle(etap : EtapeDto| undefined) {
    if(etap) {
      if (etap.titre) {
        return etap.titre
      }
    }
    return "CyberChamis";
  }

  next() {
    this.gameService.nextStep();
  }

  previous() {
    this.gameService.previousStep();
  }

  getNbIndices(etap: EtapeDto | undefined) : number{
    if (etap) {
      if (etap.nbIndices) {
        return etap.nbIndices
      }
    }
    return 0;
  }
}
