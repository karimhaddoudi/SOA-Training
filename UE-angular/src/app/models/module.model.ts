import { UniteEnseignement } from './unite-enseignement.model';

export enum TypeModule {
  TRANSVERSAL = 'TRANSVERSAL',
  PROFESSIONNEL = 'PROFESSIONNEL',
  RECHERCHE = 'RECHERCHE'
}

export interface Module {
  matricule: string;
  nom: string;
  coefficient: number;
  volumeHoraire: number;
  type: TypeModule;
  uniteEnseignement?: UniteEnseignement;
}
