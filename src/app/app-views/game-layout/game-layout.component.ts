import {Component} from '@angular/core';
import {fadeAnimation} from "../../animations/fadeAnimation";
import {PlayServiceService} from "../../services/play-service.service";
import {Observable} from "rxjs";
import {EtapeDto} from "../../api/models/etape-dto";
import {VisiteDto} from "../../api/models/visite-dto";
import {DefiDto} from "../../api/models/defi-dto";
import {ActivatedRoute} from "@angular/router";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {ReponseDto} from "../../api/models/reponse-dto";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss'],
  animations:[fadeAnimation]
})
export class GameLayoutComponent {
  notFound:boolean = false;


  constructor(private gameService:PlayServiceService,
              private route: ActivatedRoute,
              private defiRestControllerService : DefiRestControllerService,
              private snackBar: MatSnackBar
  ) {
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

  get getObsVisite() : Observable<VisiteDto>{
    return this.gameService.getObsVisite;
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

  async checkResponse(response: string) {
    const r = await this.gameService.checkResponse(response);
    this.openSnackBar(r);
  }

  getEtape(visite: VisiteDto) {
    if(visite.etapeCourante) {
        return visite.etapeCourante;
    }
    return {};
  }

  getCurrentResponse(reponse: ReponseDto | undefined, numero: number|undefined) {
    if(numero!=undefined && reponse !=undefined)
      return (reponse.numero===numero);
    else
      return null
  }

  openSnackBar(bool: boolean) {
    if(bool)
      this.snackBar.open('Bonne réponse !', 'Cacher');
    else
      this.snackBar.open('Ohhhh tu tes tromper c\'est dommage' , 'Cacher');
  }
}
