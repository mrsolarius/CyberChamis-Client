import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {IndiceDto} from "../../../../api/models/indice-dto";


@Component({
  selector: 'app-indice-sheet',
  templateUrl: './indice-sheet.component.html',
})
export class IndiceSheetComponent {
  constructor(private indiceSheetRef:MatBottomSheetRef<GameBarComponent>) { }

  openLink(event:MouseEvent){
    this.indiceSheetRef.dismiss();
    event.preventDefault();
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


}
