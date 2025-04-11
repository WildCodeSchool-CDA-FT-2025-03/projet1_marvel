import { gql } from '@apollo/client';

export const GET_ALL_ITEMS = gql`
  query GetAllItems($search: SearchInput, $filter: FilterInput) {
    getBooks(search: $search, filter: $filter) {
      items {
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
      total
    }
    getGames(search: $search, filter: $filter) {
      items {
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
      total
    }
    getMovies(search: $search, filter: $filter) {
      items {
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
      total
    }
    getMusic(search: $search, filter: $filter) {
      items {
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
      total
    }
  }
`;

export const FILTER_INPUT = gql`
  input FilterInput {
    category: String
    sortOrder: String
  }
`;
