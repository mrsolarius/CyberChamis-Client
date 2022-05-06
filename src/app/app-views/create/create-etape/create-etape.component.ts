import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IndiceDto} from "../../../api/models/indice-dto";
import {MatIconModule} from '@angular/material/icon'
import {FormControl} from "@angular/forms";
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {EtapeDto} from "../../../api/models/etape-dto";

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
   indication!:string;
   question!: string;
   reponse!: string;
   indice!:string;
   pointGagne!: number;
   pointPerdu!:number;

   listEtapes !: string[];

  selectable = true;
  removable = true;
  //@Output('ajoutEtape') ajoutEtape = new EventEmitter<void>();
  stepper: any;

  myGroup!:any;
  etape!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  checkError(controlName: string, errorName: string) {
    return this.etape.controls[controlName].hasError(errorName);
  }
}
