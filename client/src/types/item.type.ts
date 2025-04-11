export type BookData = {
  getBookById: {
    titre: string;
    resume: string;
    auteurs?: string[];
    date_publication?: string;
    genre?: string;
    nombre_pages?: number;
    format?: string;
  };
};

export type GameData = {
  getGameById: {
    title: string;
    summary: string;
    developers?: string[];
    release_date?: string;
    category?: string;
    format?: string;
    subtitle?: string;
  };
};

export type MovieData = {
  getMovieById: {
    title: string;
    summary: string;
    directors?: string[];
    release_date?: string;
    category?: string;
    duration?: number;
    format?: string;
    subtitle?: string;
  };
};

export type MusicData = {
  getOneMusicById: {
    title: string;
    summary: string;
    artists?: string[];
    release_date?: string;
    category?: string;
    duration?: number;
    format?: string | string[];
  };
};

export type ItemData = BookData | GameData | MovieData | MusicData;

export type ItemDataResult = {
  data: {
    release_date: string;
    category: string;
    duration: number;
    genre: string;
    format: string;
    subtitle: string;
    title?: string;
    titre?: string;
    summary?: string;
    resume?: string;
  };
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  title: string;
  summary: string;
  creator: string | null;
  emoji: string;
};
