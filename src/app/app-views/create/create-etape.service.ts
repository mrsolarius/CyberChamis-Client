import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {moveItemInArray} from "@angular/cdk/drag-drop";

export enum TypeEtape {
  Indication, Tache, NonDefinie
}

export interface EtapeForm {
  id: number;
  numero: number;
  titre: string;
  typeEtape: TypeEtape;
  indication: string;
  question: string;
  reponse: string;
  indice: string;
  pointsPerdus: number;
  pointsGagnes: number;
  isValide: boolean;
}

let id = 0;
export const defaultEtape: EtapeForm = {
  id,
  numero: 0,
  titre: '',
  typeEtape: TypeEtape.NonDefinie,
  indication: '',
  question: '',
  reponse: '',
  indice: '',
  pointsPerdus: 0,
  pointsGagnes: 0,
  isValide: false,
}

@Injectable({
  providedIn: 'root'
})
export class CreateEtapeService {
  private subj = new BehaviorSubject<EtapeForm[]>([defaultEtape]);

  constructor() {
  }

  addNewEtape() {
    id++;
    this.subj.next([...this.subj.value, {...defaultEtape, id, numero: this.subj.value.length}]);
  }

  removeEtape(number: number) {
    this.subj.next([
      ...this.subj.value
        .filter((e) => number !== e.numero)
        .map((e, i) => ({...e, numero: i}))
    ]);
  }

  moveEtape(oldPos: number, newPos: number) {
    if ((oldPos < 0 || oldPos > this.subj.value.length) && (newPos < 0 || newPos < this.subj.value.length)) {
      console.error('moveEtape: invalid position');
      return;
    }
    let etapes = this.subj.value;
    moveItemInArray(etapes, oldPos, newPos);
    const newEtapes = etapes.map((e, i) => ({...e, numero: i}));
    this.subj.next(newEtapes);
  }

  editEtape(number: number, etape: EtapeForm) {
    const etapes = this.subj.value;
    etapes[number] = {...etape, numero: number};
    this.subj.next(etapes);
  }

  getEtapes() {
    return this.subj.asObservable();
  }
}
