import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_ALL_BOOKS,
  GET_ALL_GAMES,
  GET_ALL_MOVIES,
  GET_ALL_MUSIC,
} from '../schemas/catalogue.schema';
import {
  Book as BookType,
  Game as GameType,
  Movie as MovieType,
  Music as MusicType,
  CatalogueItem,
  emojis,
} from '../types/catalogue.type';

export default function useCatalogueData() {
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: booksData } = useQuery(GET_ALL_BOOKS);
  const { data: gamesData } = useQuery(GET_ALL_GAMES);
  const { data: moviesData } = useQuery(GET_ALL_MOVIES);
  const { data: musicData } = useQuery(GET_ALL_MUSIC);

  useEffect(() => {
    setIsLoading(true);
    const items: CatalogueItem[] = [];

    if (booksData?.getBooks) {
      booksData.getBooks.forEach((book: BookType) => {
        items.push({
          id: book.id,
          type: 'books',
          title: book.titre,
          emoji: emojis.books,
          author: book.auteurs.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
    }

    if (gamesData?.getGames) {
      gamesData.getGames.forEach((game: GameType) => {
        items.push({
          id: game.id,
          type: 'games',
          title: game.title,
          emoji: emojis.games,
          platform: game.platforms.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
    }

    if (moviesData?.getMovies) {
      moviesData.getMovies.forEach((movie: MovieType) => {
        items.push({
          id: movie.id,
          type: 'movies',
          title: movie.title,
          emoji: emojis.movies,
          director: movie.directors.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
    }

    if (musicData?.getMusic) {
      musicData.getMusic.forEach((music: MusicType) => {
        items.push({
          id: music.id,
          type: 'music',
          title: music.title,
          emoji: emojis.music,
          artist: music.artists.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
    }

    setCatalogueItems(items);
    setIsLoading(false);
  }, [booksData, gamesData, moviesData, musicData]);

  return { catalogueItems, isLoading };
}
