import {Component, Input, OnInit} from '@angular/core';

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
   typeEtape!: TypeEtape;

  constructor() { }

  ngOnInit(): void {
  }

}
