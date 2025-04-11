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

const processBooks = (books: BookType[]): CatalogueItem[] =>
  books.map(book => ({
    id: book.id,
    type: 'books',
    title: book.titre,
    emoji: emojis.books,
    author: book.auteurs.join(', '),
    rating: Math.floor(Math.random() * 3) + 3,
  }));

const processGames = (games: GameType[]): CatalogueItem[] =>
  games.map(game => ({
    id: game.id,
    type: 'games',
    title: game.title,
    emoji: emojis.games,
    platform: game.platforms.join(', '),
    rating: Math.floor(Math.random() * 3) + 3,
  }));

const processMovies = (movies: MovieType[]): CatalogueItem[] =>
  movies.map(movie => ({
    id: movie.id,
    type: 'movies',
    title: movie.title,
    emoji: emojis.movies,
    director: movie.directors.join(', '),
    rating: Math.floor(Math.random() * 3) + 3,
  }));

const processMusic = (musicItems: MusicType[]): CatalogueItem[] =>
  musicItems.map(music => ({
    id: music.id,
    type: 'music',
    title: music.title,
    emoji: emojis.music,
    artist: music.artists.join(', '),
    rating: Math.floor(Math.random() * 3) + 3,
  }));

export default function useCatalogueData({
  searchTerm = '',
  category = 'all',
  sortOrder = 'asc',
  page = 1,
  limit = 8,
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

    let items: CatalogueItem[] = [];
    let total = 0;

    if (category === 'all') {
      const availableCategories = [
        data?.getBooks?.items?.length ? 'books' : null,
        data?.getGames?.items?.length ? 'games' : null,
        data?.getMovies?.items?.length ? 'movies' : null,
        data?.getMusic?.items?.length ? 'music' : null,
      ].filter(Boolean) as string[];

      const itemsPerCategory = Math.ceil(limit / availableCategories.length);

      if (data?.getBooks?.items?.length) {
        const booksToTake = Math.min(itemsPerCategory, data.getBooks.items.length);
        items = [...items, ...processBooks(data.getBooks.items.slice(0, booksToTake))];
        total += data.getBooks.total;
      }

      if (data?.getGames?.items?.length) {
        const gamesToTake = Math.min(itemsPerCategory, data.getGames.items.length);
        items = [...items, ...processGames(data.getGames.items.slice(0, gamesToTake))];
        total += data.getGames.total;
      }

      if (data?.getMovies?.items?.length) {
        const moviesToTake = Math.min(itemsPerCategory, data.getMovies.items.length);
        items = [...items, ...processMovies(data.getMovies.items.slice(0, moviesToTake))];
        total += data.getMovies.total;
      }

      if (data?.getMusic?.items?.length) {
        const musicToTake = Math.min(itemsPerCategory, data.getMusic.items.length);
        items = [...items, ...processMusic(data.getMusic.items.slice(0, musicToTake))];
        total += data.getMusic.total;
      }
    } else {
      switch (category) {
        case 'books':
          if (data?.getBooks?.items) {
            items = processBooks(data.getBooks.items);
            total = data.getBooks.total;
          }
          break;
        case 'games':
          if (data?.getGames?.items) {
            items = processGames(data.getGames.items);
            total = data.getGames.total;
          }
          break;
        case 'movies':
          if (data?.getMovies?.items) {
            items = processMovies(data.getMovies.items);
            total = data.getMovies.total;
          }
          break;
        case 'music':
          if (data?.getMusic?.items) {
            items = processMusic(data.getMusic.items);
            total = data.getMusic.total;
          }
          break;
      }
    }

    setCatalogueItems(items);
    setTotalItems(total);
    setIsLoading(false);
  }, [data, loading, category, limit]);

  return { catalogueItems, totalItems, isLoading };
}
