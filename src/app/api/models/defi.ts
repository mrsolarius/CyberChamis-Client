/* tslint:disable */
/* eslint-disable */
import { Arret } from './arret';
import { Chami } from './chami';
import { Commentaire } from './commentaire';
import { Etape } from './etape';
import { Note } from './note';
import { Tag } from './tag';
export interface Defi {
  arret?: Arret;
  auteur?: Chami;
  commentaires?: Array<Commentaire>;
  dateDeCreation?: string;
  dateDeModification?: string;
  description?: string;
  duree?: string;
  etapes?: Array<Etape>;
  id?: string;
  moyenne?: number;
  notes?: Array<Note>;
  pointTotaux?: number;
  sortEtapes?: Array<Etape>;
  tags?: Array<Tag>;
  titre?: string;
  version?: number;
}
