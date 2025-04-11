import { Book, Music, Gamepad2, Film } from 'lucide-react';
import {
  ItemData,
  ItemDataResult,
  BookData,
  MovieData,
  GameData,
  MusicData,
} from '../types/item.type';

function isBookData(data: ItemData): data is BookData {
  return 'getBookById' in data;
}

function isGameData(data: ItemData): data is GameData {
  return 'getGameById' in data;
}

function isMovieData(data: ItemData): data is MovieData {
  return 'getMovieById' in data;
}

function isMusicData(data: ItemData): data is MusicData {
  return 'getOneMusicById' in data;
}

export const getItemData = (type: string | undefined, data: ItemData): ItemDataResult | null => {
  if (!data || !type) return null;

  if (type === 'books' && isBookData(data)) {
    return {
      data: {
        release_date: data.getBookById.date_publication || '',
        category: data.getBookById.genre || '',
        duration: data.getBookById.nombre_pages || 0,
        genre: data.getBookById.genre || '',
        format: data.getBookById.format || '',
        subtitle: '',
        titre: data.getBookById.titre,
        resume: data.getBookById.resume,
      },
      icon: <Book className="mr-1" size={18} />,
      label: 'Livre',
      bgColor: 'bg-blue-50',
      title: data.getBookById.titre,
      summary: data.getBookById.resume,
      creator: data.getBookById.auteurs ? `Par ${data.getBookById.auteurs.join(', ')}` : null,
      emoji: '📚',
    };
  }

  if (type === 'games' && isGameData(data)) {
    return {
      data: {
        release_date: data.getGameById.release_date || '',
        category: data.getGameById.category || '',
        duration: 0,
        genre: data.getGameById.category || '',
        format: data.getGameById.format || '',
        subtitle: data.getGameById.subtitle || '',
        title: data.getGameById.title,
        summary: data.getGameById.summary,
      },
      icon: <Gamepad2 className="mr-1" size={18} />,
      label: 'Jeu Vidéo',
      bgColor: 'bg-green-50',
      title: data.getGameById.title,
      summary: data.getGameById.summary,
      creator: data.getGameById.developers
        ? `Développé par ${data.getGameById.developers.join(', ')}`
        : null,
      emoji: '🎮',
    };
  }

  if (type === 'movies' && isMovieData(data)) {
    return {
      data: {
        release_date: data.getMovieById.release_date || '',
        category: data.getMovieById.category || '',
        duration: data.getMovieById.duration || 0,
        genre: data.getMovieById.category || '',
        format: data.getMovieById.format || '',
        subtitle: data.getMovieById.subtitle || '',
        title: data.getMovieById.title,
        summary: data.getMovieById.summary,
      },
      icon: <Film className="mr-1" size={18} />,
      label: 'Film',
      bgColor: 'bg-red-50',
      title: data.getMovieById.title,
      summary: data.getMovieById.summary,
      creator: data.getMovieById.directors
        ? `Réalisé par ${data.getMovieById.directors.join(', ')}`
        : null,
      emoji: '🎬',
    };
  }

  if (type === 'music' && isMusicData(data)) {
    return {
      data: {
        release_date: data.getOneMusicById.release_date || '',
        category: data.getOneMusicById.category || '',
        duration: data.getOneMusicById.duration || 0,
        genre: data.getOneMusicById.category || '',
        format: Array.isArray(data.getOneMusicById.format)
          ? data.getOneMusicById.format.join(', ')
          : data.getOneMusicById.format || '',
        subtitle: '',
        title: data.getOneMusicById.title,
        summary: data.getOneMusicById.summary,
      },
      icon: <Music className="mr-1" size={18} />,
      label: 'Album',
      bgColor: 'bg-purple-50',
      title: data.getOneMusicById.title,
      summary: data.getOneMusicById.summary,
      creator: data.getOneMusicById.artists
        ? `Par ${data.getOneMusicById.artists.join(', ')}`
        : null,
      emoji: '🎵',
    };
  }

  return null;
};
