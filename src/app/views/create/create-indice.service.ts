import { Injectable } from '@angular/core';
import {AbstractForm, FormCollection} from "./form-collection";
import {IndiceDto} from "../../apis/api-local/models/indice-dto";

export interface IndiceForm extends AbstractForm{
  indice: string;
  pointsPerdus: number;
}

export function castToIndiceDto(form: IndiceForm): IndiceDto {
  return {
    //id: form.id,
    indice: form.indice,
    pointsPerdus: form.pointsPerdus,
    numIndice: form.numero,
  }
}

export const defaultIndice: IndiceForm = {
  id:0,
  numero:0,
  indice:'',
  pointsPerdus:0,
  isValide:false,
}

@Injectable({
  providedIn: 'any'
})
export class CreateIndiceService extends FormCollection<IndiceForm>{
  protected defaultValue: IndiceForm = defaultIndice;
}
