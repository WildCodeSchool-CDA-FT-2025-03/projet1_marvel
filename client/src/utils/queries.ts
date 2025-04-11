import {
  GET_BOOK_BY_ID,
  GET_GAME_BY_ID,
  GET_MOVIE_BY_ID,
  GET_MUSIC_BY_ID,
} from '../schemas/catalogue.schema';

export const getQueryForType = (type: string) => {
  switch (type) {
    case 'books':
      return GET_BOOK_BY_ID;
    case 'games':
      return GET_GAME_BY_ID;
    case 'movies':
      return GET_MOVIE_BY_ID;
    case 'music':
      return GET_MUSIC_BY_ID;
    default:
      return GET_BOOK_BY_ID;
  }
};
