/* tslint:disable */
/* eslint-disable */
import { ArretDto } from './arret-dto';
import { EtapeCreateDto } from './etape-create-dto';
export interface DefiCreateDto {
  arret?: ArretDto;
  auteurId?: number;
  description?: string;
  duree?: string;
  etapes?: Array<EtapeCreateDto>;
  id?: string;
  img?: string;
  miniDescription?: string;
  tags?: Array<string>;
  titre?: string;
  version?: number;
}
