/* tslint:disable */
/* eslint-disable */
import { DefiDto } from './defi-dto';
import { EtapeDto } from './etape-dto';
import { ReponseDto } from './reponse-dto';
export interface VisiteDto {
  debut?: string;
  defi?: DefiDto;
  etapeCourante?: EtapeDto;
  finVisite?: string;
  id?: number;
  points?: number;
  reponseCourante?: ReponseDto;
  statut?: 'ENCOURS' | 'ABONDON' | 'FINISHED' | 'PAUSE';
}
