export type BookData = {
  titre: string;
  auteurs?: string | string[];
  auteur?: string | string[];
  editeur: string;
  date_publication: string;
  isbn?: string;
  format?: string;
  nombre_pages?: number;
  genre?: string;
  resume?: string;
  mots_cles?: string[];
  public_cible?: string;
  langue_originale?: string;
  serie: boolean;
  extrait?: string;
  prix_distinctions?: string;
};
