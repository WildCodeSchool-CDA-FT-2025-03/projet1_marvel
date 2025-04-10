import { gql } from '@apollo/client';

export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    getBooks {
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
    getGames {
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
    getMovies {
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
    getMusic {
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
