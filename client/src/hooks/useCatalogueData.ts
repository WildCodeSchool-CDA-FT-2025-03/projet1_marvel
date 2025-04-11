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

type UseCatalogueDataProps = {
  searchTerm?: string;
  category?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
};

export default function useCatalogueData({
  searchTerm = '',
  category = 'all',
  sortOrder = 'asc',
  page = 1,
  limit = 12,
}: UseCatalogueDataProps = {}) {
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { data, loading } = useQuery(GET_ALL_ITEMS, {
    variables: {
      search: searchTerm ? { searchTerm } : null,
      filter: {
        category,
        sortOrder,
        page,
        limit,
      },
    },
  });

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }

    const items: CatalogueItem[] = [];
    let total = 0;

    if (data?.getBooks && (category === 'all' || category === 'books')) {
      data.getBooks.items.forEach((book: BookType) => {
        items.push({
          id: book.id,
          type: 'books',
          title: book.titre,
          emoji: emojis.books,
          author: book.auteurs.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
      total += data.getBooks.total;
    }

    if (data?.getGames && (category === 'all' || category === 'games')) {
      data.getGames.items.forEach((game: GameType) => {
        items.push({
          id: game.id,
          type: 'games',
          title: game.title,
          emoji: emojis.games,
          platform: game.platforms.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
      total += data.getGames.total;
    }

    if (data?.getMovies && (category === 'all' || category === 'movies')) {
      data.getMovies.items.forEach((movie: MovieType) => {
        items.push({
          id: movie.id,
          type: 'movies',
          title: movie.title,
          emoji: emojis.movies,
          director: movie.directors.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
      total += data.getMovies.total;
    }

    if (data?.getMusic && (category === 'all' || category === 'music')) {
      data.getMusic.items.forEach((music: MusicType) => {
        items.push({
          id: music.id,
          type: 'music',
          title: music.title,
          emoji: emojis.music,
          artist: music.artists.join(', '),
          rating: Math.floor(Math.random() * 3) + 3,
        });
      });
      total += data.getMusic.total;
    }

    setCatalogueItems(items);
    setTotalItems(total);
    setIsLoading(false);
  }, [data, loading, category]);

  return { catalogueItems, totalItems, isLoading };
}
