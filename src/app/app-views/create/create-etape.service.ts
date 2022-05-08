import {Injectable} from '@angular/core';
import {AbstractForm, FormCollection} from "./form-collection";

export enum TypeEtape {
  Indication, Tache, NonDefinie
}

export interface EtapeForm extends AbstractForm {
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
export class CreateEtapeService extends FormCollection<EtapeForm> {
  defaultValue: EtapeForm = defaultEtape;

  constructor() {
    super();
    this.setDefaultValue();
  }
}
