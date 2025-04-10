import { gql } from '@apollo/client';

export const GET_ALL_ITEMS = gql`
  query GetAllItems($search: SearchInput) {
    getBooks(search: $search) {
      id
      titre
      auteurs
      editeur
      date_publication
      format
      genre
      resume
      mots_cles
      public_cible
      serie
    }
    getGames(search: $search) {
      id
      title
      developers
      publishers
      release_date
      platforms
      category
      summary
      keywords
      targeted_audience
      series
      pegi_esrb_rating
    }
    getMovies(search: $search) {
      id
      title
      directors
      release_date
      duration
      category
      summary
      keywords
      targeted_audience
      series
      actors
    }
    getMusic(search: $search) {
      id
      title
      artists
      release_date
      format
      duration
      category
      summary
      keywords
      targeted_audience
      series
    }
  }
`;
