import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {IndiceDto} from "../../../../api/models/indice-dto";
import {PlayServiceService, VisiteImpl} from "../../../../services/play-service.service";
import {Observable} from "rxjs";
import {EtapeDto} from "../../../../api/models/etape-dto";
import {ReponseDto} from "../../../../api/models/reponse-dto";


@Component({
  selector: 'app-indice-sheet',
  templateUrl: './indice-sheet.component.html',
})
export class IndiceSheetComponent {
  constructor(private indiceSheetRef:MatBottomSheetRef<GameBarComponent>,private gameService : PlayServiceService) { }

  get getObsVisite() : Observable<VisiteImpl>{
    return this.gameService.getObsVisite;
  }


  openLink(event:MouseEvent){
    this.indiceSheetRef.dismiss();
    event.preventDefault();
  }

  revealIndice(){
    this.gameService.revealHint();
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
}
@Component({
  selector: 'app-game-bar',
  templateUrl: './game-bar.component.html',
  styleUrls: ['./game-bar.component.scss']
})
export class GameBarComponent implements OnInit {
  @Input('totalStep') totalStep:number=1;
  @Input('currentStep') currentStep:number=1;
  @Input('currentHintList') currentHintList: IndiceDto[]=[];
  @Input('nbIndices') nbIndices = 0;
  @Input('nbIndicesUsed') nbIndicesUtilises = 0;
  @Output('nextStep') nextStep = new EventEmitter<void>();
  @Output('previousStep') previousStep = new EventEmitter<void>();
  @Output('revealHint') revealHint = new EventEmitter<void>();
  @Output('finishGame') finishGame = new EventEmitter<void>();

  constructor(private bottomSheet : MatBottomSheet) { }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    this.bottomSheet.open(IndiceSheetComponent);
  }

  toPercent() : number {
    return this.currentStep/this.totalStep*100
  }

  disablePrevious() {
    return this.currentStep==1;
  }

  disableNext() {
    return this.currentStep==this.totalStep;
  }

  getAvailablesIndices() : number  | null{
    const rest =  this.nbIndices - this.nbIndicesUtilises;
    if(rest>0){
      return rest;
    }
    return null;
  }


}
