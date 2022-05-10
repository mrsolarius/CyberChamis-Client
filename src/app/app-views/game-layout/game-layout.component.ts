import {Component} from '@angular/core';
import {fadeAnimation} from "../../animations/fadeAnimation";
import {PlayServiceService} from "../../services/play-service.service";
import {Observable, switchMap} from "rxjs";
import {EtapeDto} from "../../api/models/etape-dto";
import {VisiteDto} from "../../api/models/visite-dto";
import {DefiDto} from "../../api/models/defi-dto";
import {ActivatedRoute} from "@angular/router";
import {DefiRestControllerService} from "../../api/services/defi-rest-controller.service";
import {ReponseDto} from "../../api/models/reponse-dto";
import { MatSnackBar } from '@angular/material/snack-bar';
import {map} from "rxjs/operators";
import {FirefilesService} from "../../firefiles.service";

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss'],
  animations:[fadeAnimation]
})
export class GameLayoutComponent {
  notFound:boolean = false;
  finishView:boolean = false;
  private obsVisiteView :Observable<VisiteDto>;


  constructor(private gameService:PlayServiceService,
              private route: ActivatedRoute,
              private defiRestControllerService : DefiRestControllerService,
              private snackBar: MatSnackBar,
              private fireFile : FirefilesService
  ) {
    this.route.params.subscribe(params => {
      defiRestControllerService.getById({id:params['id']}).subscribe({
        next: (defi) => {
          this.gameService.startGame(defi.id!);
          this.finishView = false;
        },
        error: () => {
          this.notFound = true;
        },
      });
    });

    this.obsVisiteView = this.gameService.getObsVisite.pipe(
      map(async (value)=>{
        if (value.etapeCourante?.banner)
        return {
          ...value,
          etapeCourante:{
            ...value.etapeCourante,
            banner: await this.fireFile.getPhotoUrl('defis',value.etapeCourante.banner)
          }
        }
        else
          return {
          ...value,
            etapeCourante:{
            ...value.etapeCourante,
              banner: ''
            }
          }
      }),
      switchMap(async (value)=>{
        return await value
      })
    )
  }

  get getObsVisite() : Observable<VisiteDto>{
    return this.obsVisiteView;
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

  getNbIndicesUtilises(reponse:ReponseDto|undefined) : number{
    if(reponse){
      if(reponse.nbIndicesUtilises){
        return reponse.nbIndicesUtilises;
      }
    }
    return 0;
  }

  async checkResponse(response: string) {
    const r = await this.gameService.checkResponse(response);
    await this.gameService.updateVisiteFromSrv();
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
      this.snackBar.open('Bonne réponse ! Tu es un petit génie !', 'Cacher', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'green-snackbar','snack-up']});
    else
      this.snackBar.open('Ohhhh non, tu t\'es trompé c\'est dommage...' , 'Cacher', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'red-snackbar', 'snack-up']});
  }

  async finish() {
    await this.gameService.editStatus("FINISHED");
    //await this.gameService.updateVisiteFromSrv();
    this.finishView = true;
  }

  getDefiTitre(defi: DefiDto | undefined) {
    if(defi){
      if(defi.titre){
        return defi.titre;
      }
    }
    return "";
  }
}
