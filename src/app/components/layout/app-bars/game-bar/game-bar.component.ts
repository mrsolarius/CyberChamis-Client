import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";


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

  constructor(private bottomSheet : MatBottomSheet) { }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    this.bottomSheet.open(IndiceSheetComponent);
  }
}
