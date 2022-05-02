/* tslint:disable */
/* eslint-disable */
import { Defi } from './defi';
import { Etape } from './etape';
import { Indice } from './indice';
import { Reponse } from './reponse';
export interface Visite {
  defi?: Defi;
  etapeCourante?: Etape;
  id?: number;
  indices?: Array<Indice>;
  points?: number;
  reponseCourante?: Reponse;
  reponses?: Array<Reponse>;
  statut?: 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE';
}
