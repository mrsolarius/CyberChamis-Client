import { Injectable } from '@angular/core';
import {AbstractForm, FormCollection} from "./form-collection";

export interface IndiceForm extends AbstractForm{
  indice: string;
  pointsPerdus: number;
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
