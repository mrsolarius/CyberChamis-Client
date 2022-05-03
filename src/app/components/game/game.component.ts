import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EtapeDto} from "../../api/models/etape-dto";
import {ReponseDto} from "../../api/models/reponse-dto";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input('step') step! : EtapeDto;
  @Input('responseDTO') responseDTO: ReponseDto | null = null;
  @Output('response') response = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  checkButton(value:string) {
    if(value.trim().length==0){
      return
    }
    this.response.emit(value.trim());
    this.responseDTO={
      reponseUtilisateur:value
    }
  }

  getResponseValue():string {
    return this.responseDTO===null?"":this.responseDTO.reponseUtilisateur==undefined?"":this.responseDTO.reponseUtilisateur;
  }
}
