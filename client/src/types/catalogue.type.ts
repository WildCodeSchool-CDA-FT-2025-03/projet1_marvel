export type Book = {
  id: number;
  titre: string;
  auteurs: string[];
  editeur: string;
  date_publication: string;
  format?: string;
  genre?: string;
  resume?: string;
  mots_cles?: string[];
  public_cible?: string;
  serie: boolean;
};

export type Game = {
  id: number;
  title: string;
  developers: string[];
  publishers: string[];
  release_date: string;
  platforms: string[];
  category: string;
  summary: string;
  keywords: string[];
  targeted_audience: string;
  series: boolean;
  pegi_esrb_rating: string;
};

export type Movie = {
  id: number;
  title: string;
  directors: string[];
  release_date: string;
  duration: number;
  category: string[];
  summary: string;
  keywords: string[];
  targeted_audience: string;
  series: boolean;
  actors: string[];
};

export type Music = {
  id: number;
  title: string;
  artists: string[];
  release_date: Date | string;
  format: string[];
  duration: number;
  category: string;
  summary: string;
  keywords: string[];
  targeted_audience: string;
  series: boolean;
};

export type CatalogueItem = {
  id: number;
  type: 'books' | 'music' | 'games' | 'movies';
  title: string;
  emoji: string;
  rating: number;
  author?: string;
  artist?: string;
  director?: string;
  platform?: string;
};

export const emojis = {
  books: '📚',
  music: '🎵',
  games: '🎮',
  movies: '🎬',
};
