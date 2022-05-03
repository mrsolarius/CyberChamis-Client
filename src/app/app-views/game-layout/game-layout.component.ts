import {Component} from '@angular/core';
import {fadeAnimation} from "../../animations/fadeAnimation";
import {PlayServiceService} from "../../services/play-service.service";
import {Observable} from "rxjs";
import {EtapeDto} from "../../api/models/etape-dto";
import {VisiteDto} from "../../api/models/visite-dto";
import {IndiceDto} from "../../api/models/indice-dto";
import {DefiDto} from "../../api/models/defi-dto";
import {ActivatedRoute} from "@angular/router";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {ReponseDto} from "../../api/models/reponse-dto";

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss'],
  animations:[fadeAnimation]
})
export class GameLayoutComponent {
  notFound:boolean = false;


  constructor(private gameService:PlayServiceService,private route: ActivatedRoute,private defiRestControllerService : DefiRestControllerService) {
    this.route.params.subscribe(params => {
      defiRestControllerService.getById({id:params['id']}).subscribe({
        next: (defi) => {
          this.gameService.startGame(defi.id!);
        },
        error: () => {
          this.notFound = true;
        },
      });
    });
  }

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

  checkResponse(response: string) {
    this.gameService.checkResponse(response);
  }

  getEtape(visite: VisiteDto) {
    if(visite.etapeCourante) {
        return visite.etapeCourante;
    }
    return {};
  }

  getCurrentResponse(reponse: Array<ReponseDto> | undefined, numero: number|undefined) {
    if(numero!=undefined && reponse !=undefined)
      return reponse.filter(r=>r.numero===numero)[0];
    else
      return null
  }
}
