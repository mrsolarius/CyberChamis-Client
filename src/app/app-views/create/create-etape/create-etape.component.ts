import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IndiceDto} from "../../../api/models/indice-dto";
import {MatIconModule} from '@angular/material/icon'
import {FormControl} from "@angular/forms";

enum TypeEtape {
  Indication,Tache
}
export interface Tache{
  readonly question:string;
  readonly reponse:string;
}

export interface Etape {
  readonly titre: string;
  readonly description: string;
  readonly numero: number;
  readonly typeEtape: TypeEtape;
}
@Component({
  selector: 'app-create-etape',
  templateUrl: './create-etape.component.html',
  styleUrls: ['./create-etape.component.scss']
})
export class CreateEtapeComponent implements OnInit {
   typeEtape!: string;
   indication!:IndiceDto;
   pointGagne!: number;
   pointPerdu!:number;
  //@Output('ajoutEtape') ajoutEtape = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
