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

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: Float!) {
    getBookById(id: $id) {
      id
      titre
      auteurs
      editeur
      date_publication
      format
      genre
      resume
    }
  }
`;

export const GET_GAME_BY_ID = gql`
  query GetGameById($id: Float!) {
    getGameById(id: $id) {
      id
      title
      subtitle
      developers
      publishers
      release_date
      format
      platforms
      duration
      category
      summary
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($id: Float!) {
    getMovieById(id: $id) {
      id
      title
      subtitle
      directors
      studios
      release_date
      format
      duration
      category
      summary
    }
  }
`;

export const GET_MUSIC_BY_ID = gql`
  query GetMusicById($id: Float!) {
    getOneMusicById(id: $id) {
      id
      title
      artists
      label
      release_date
      format
      duration
      category
      summary
    }
  }
`;

export const FILTER_INPUT = gql`
  input FilterInput {
    category: String
    sortOrder: String
  }
`;
