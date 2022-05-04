/* tslint:disable */
/* eslint-disable */
import { DefiDto } from './defi-dto';
import { EtapeDto } from './etape-dto';
import { ReponseDto } from './reponse-dto';
export interface VisiteDto {
  defi?: DefiDto;
  etapeCourante?: EtapeDto;
  id?: number;
  points?: number;
  reponses?: Array<ReponseDto>;
  statut?: string;
}
