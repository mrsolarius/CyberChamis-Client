/* tslint:disable */
/* eslint-disable */
import { ArretDto } from './arret-dto';
import { ChamiDto } from './chami-dto';
import { EtapeDto } from './etape-dto';
import { TagDto } from './tag-dto';
export interface DefiDto {
  arretDTO?: ArretDto;
  auteur?: ChamiDto;
  dateCreation?: string;
  dateDeModification?: string;
  description?: string;
  duree?: string;
  etapes?: Array<EtapeDto>;
  id?: string;
  img?: string;
  noteMoyenne?: number;
  pointTotaux?: number;
  tags?: Array<TagDto>;
  titre?: string;
  version?: number;
}
