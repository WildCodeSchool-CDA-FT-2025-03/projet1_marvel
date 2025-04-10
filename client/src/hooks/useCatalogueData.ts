import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from '../schemas/catalogue.schema';
import {
  Book as BookType,
  Game as GameType,
  Movie as MovieType,
  Music as MusicType,
  CatalogueItem,
  emojis,
} from '../types/catalogue.type';

export default function useCatalogueData(searchTerm = '') {
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, loading } = useQuery(GET_ALL_ITEMS, {
    variables: {
      search: searchTerm ? { searchTerm } : null,
    },
  });

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }

    const items: CatalogueItem[] = [];

    if (data?.getBooks) {
      data.getBooks.forEach((book: BookType) => {
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

    if (data?.getGames) {
      data.getGames.forEach((game: GameType) => {
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

    if (data?.getMovies) {
      data.getMovies.forEach((movie: MovieType) => {
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

    if (data?.getMusic) {
      data.getMusic.forEach((music: MusicType) => {
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
  }, [data, loading]);

  return { catalogueItems, isLoading };
}
