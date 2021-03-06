import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EtapeDto} from "../../../apis/api-local/models/etape-dto";
import {ReponseDto} from "../../../apis/api-local/models/reponse-dto";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  panelOpenState = false;
  @Input('step') step! : EtapeDto;
  @Input('responseDTO') responseDTO: ReponseDto | undefined = {};
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

  getResponseValue():string{
    return this.responseDTO?.reponseUtilisateur?this.responseDTO.reponseUtilisateur:"";
  }

  getHasResponse() {
    if(this.responseDTO?.hasResponse === undefined){
      return false
    }
    return <boolean> this.responseDTO?.hasResponse;
  }

}
