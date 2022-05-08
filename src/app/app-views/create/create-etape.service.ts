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

export const defaultEtape: EtapeForm = {
  id:0,
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
