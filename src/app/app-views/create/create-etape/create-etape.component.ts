import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IndiceDto} from "../../../api/models/indice-dto";
import {MatIconModule} from '@angular/material/icon'
import {FormControl} from "@angular/forms";
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from "@angular/cdk/keycodes";

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
  nbetape!:number
  typeEtape!: string;
   indication!:IndiceDto;
   pointGagne!: number;
   pointPerdu!:number;
   motCles: string[] = [];
  //@Output('ajoutEtape') ajoutEtape = new EventEmitter<void>();
  stepper: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() { }

  ngOnInit(): void {
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if (this.motCles.filter((v) => v === value)?.length === 0) {
        this.motCles.push(value.trim());
      }
    }
    if (input) {
      input.value = '';
    }
  }

  remove(mot: string): void {
    const index = this.motCles.indexOf(mot);

    if (index >= 0) {
      this.motCles.splice(index, 1);
    }
  }

}
