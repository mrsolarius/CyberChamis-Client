import {Injectable} from '@angular/core';
import {AbstractForm, FormCollection} from "./form-collection";
import {castToIndiceDto, IndiceForm} from "./create-indice.service";
import {EtapeCreateDto} from "../../apis/api-local/models/etape-create-dto";

export enum TypeEtape {
  Indication, Tache, NonDefinie
}

export interface EtapeForm extends AbstractForm {
  titre: string;
  description: string;
  typeEtape: TypeEtape;
  indication: string;
  question: string;
  reponse: string;
  indices: IndiceForm[];
  pointsGagnes: number;
  stepImg: File|null;
}

export interface EtapeFormToSend extends AbstractForm {
  titre: string;
  description: string;
  typeEtape: TypeEtape;
  indication: string;
  question: string;
  reponse: string;
  indices: IndiceForm[];
  pointsGagnes: number;
  stepImg: string;
}

export const defaultEtape: EtapeForm = {
  id:0,
  numero: 0,
  titre: '',
  description: '',
  typeEtape: TypeEtape.NonDefinie,
  indication: '',
  question: '',
  reponse: '',
  indices: [],
  pointsGagnes: 0,
  isValide: false,
  stepImg: null,
}

export function castToEtapeCreateDto(etape: EtapeFormToSend): EtapeCreateDto {
  return {
    //idEtape: etape.id,
    numero: etape.numero,
    titreEtape: etape.titre,
    descriptionEtape: etape.indication,
    question: etape.question,
    secret: etape.reponse,
    indices: etape.indices.map(castToIndiceDto),
    point: etape.pointsGagnes,
    text: etape.indication,
    type: etape.typeEtape === TypeEtape.Indication ? 'IndicationDTO' : etape.typeEtape === TypeEtape.Tache ? 'TacheDTO' : undefined,
    banner: etape.stepImg,
  };
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
