/* tslint:disable */
/* eslint-disable */
import { IndiceDto } from './indice-dto';
export interface EtapeCreateDto {
  descriptionEtape?: string;
  idEtape?: number;
  image?: string;
  indices?: Array<IndiceDto>;
  numero?: number;
  point?: number;
  question?: string;
  secret?: string;
  text?: string;
  titreEtape?: string;
  type?: 'TacheDTO' | 'IndicationDTO';
  video?: string;
}
