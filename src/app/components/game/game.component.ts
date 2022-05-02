import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EtapeDto} from "../../api/models/etape-dto";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input('step') step! : EtapeDto;
  @Output('response') response = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  checkButton(value: string) {
    if(value.trim().length==0){
      return
    }
    this.response.emit(value.trim());
  }
}
