import { join } from 'path';
import { readFileSync, existsSync } from 'fs';
import 'reflect-metadata';
import 'dotenv/config';

import { dataSource } from './client';
import { Game } from '../entities/game.entity';
import { Book } from '../entities/book.entity';
import { GameData } from '../types/game.type';
import { DatasetType } from '../types/dataset.type';
import { BookData } from '../types/book.type';
import { MovieData } from '../types/movie.type';
import { Movie } from '../entities/movie.entity';
import { MusicData } from '../types/music.type';
import { Music } from '../entities/music.entity';
import { Tracklist } from '../entities/tracklist.entity';

async function resetAutoIncrement(tableName: string): Promise<void> {
  try {
    await dataSource.query(`DELETE FROM sqlite_sequence WHERE name = ?`, [tableName]);
    console.info(`🔄 Reset auto-increment for table ${tableName}`);
  } catch (error) {
    console.warn(`⚠️ Could not reset auto-increment for table ${tableName}`, error);
  }
}

async function importGamesData(jsonPath: string): Promise<void> {
  const jsonData = readFileSync(jsonPath, 'utf8');
  const games: GameData[] = JSON.parse(jsonData);

  console.info(`🎮 ${games.length} games found in JSON file`);

  await Game.clear();
  console.info('🧹 Games table cleared');

  await resetAutoIncrement('game');

  const gameEntities = games.map((game) => {
    const gameEntity = new Game();

    gameEntity.title = game.title;
    gameEntity.subtitle = game.subtitle || '';
    gameEntity.developers = game.developers;
    gameEntity.publishers = game.publishers;
    gameEntity.release_date = game.release_date;
    gameEntity.isbn = game.ISBN || '';
    gameEntity.format = game.format;
    gameEntity.platforms = game.platforms;
    gameEntity.duration = game.duration || '';
    gameEntity.category = game.category;
    gameEntity.summary = game.summary;
    gameEntity.keywords = game.keywords;
    gameEntity.targeted_audience = game.targeted_audience;
    gameEntity.original_language = game.original_language;
    gameEntity.series = game.series;
    gameEntity.extract = game.extract || '';
    gameEntity.awards = game.awards || [];
    gameEntity.game_modes = game.game_modes;
    gameEntity.game_engine = game.game_engine || '';
    gameEntity.pegi_esrb_rating = game['PEGI/ESRB_rating'] || game['PEGI_ESRB_rating'] || '';
    gameEntity.online_features = game.online_features || [];
    gameEntity.dlc_expansions = game.dlc_expansions || [];
    gameEntity.gameplay_mechanics = game.gameplay_mechanics;
    gameEntity.soundtrack = game.soundtrack || '';
    gameEntity.available_on = game.available_on;
    gameEntity.mod_support = game.mod_support;

    return gameEntity;
  });

  await Game.save(gameEntities);
  console.info(`✅ ${gameEntities.length} games successfully imported`);
}

async function importBooksData(jsonPath: string): Promise<void> {
  const jsonData = readFileSync(jsonPath, 'utf8');
  const books: BookData[] = JSON.parse(jsonData);

  console.info(`📚 ${books.length} books found in JSON file`);

  await Book.clear();
  console.info('🧹 Books table cleared');

  await resetAutoIncrement('book');

  const bookEntities = books.map((book) => {
    const bookEntity = new Book();

    let auteurs = book.auteurs || book.auteur || [''];

    if (typeof auteurs === 'string') auteurs = [auteurs];

    bookEntity.titre = book.titre;
    bookEntity.auteurs = auteurs;
    bookEntity.editeur = book.editeur;
    bookEntity.date_publication = book.date_publication;
    bookEntity.isbn = book.isbn || '';
    bookEntity.format = book.format || '';
    bookEntity.nombre_pages = book.nombre_pages || 0;
    bookEntity.genre = book.genre || '';
    bookEntity.resume = book.resume || '';
    bookEntity.mots_cles = book.mots_cles || [];
    bookEntity.public_cible = book.public_cible || '';
    bookEntity.langue_originale = book.langue_originale || '';
    bookEntity.serie = book.serie;
    bookEntity.extrait = book.extrait || '';
    bookEntity.prix_distinctions = book.prix_distinctions || '';

    return bookEntity;
  });

  await Book.save(bookEntities);
  console.info(`✅ ${bookEntities.length} books successfully imported`);
}

async function importMoviesData(jsonPath: string): Promise<void> {
  const jsonData = readFileSync(jsonPath, 'utf8');
  const movies: MovieData[] = JSON.parse(jsonData);

  console.info(`🎬 ${movies.length} movies found in JSON file`);

  await Movie.clear();
  console.info('🧹 Movies table cleared');

  await resetAutoIncrement('movie');

  const movieEntities = movies.map((movie) => {
    const movieEntity = new Movie();

    if (typeof movie.category === 'string') movie.category = movie.category.split(', ');

    if (typeof movie.format === 'string') movie.format = movie.format.split(', ');

    movieEntity.title = movie.title;
    movieEntity.subtitle = movie.subtitle || '';
    movieEntity.directors = movie.directors;
    movieEntity.writers = movie.writers;
    movieEntity.producers = movie.producers;
    movieEntity.studios = movie.studios;
    movieEntity.release_date = movie.release_date;
    movieEntity.isbn_ean_upc = movie['ISBN_EAN_UPC'] || movie.ISBN || '';
    movieEntity.format = movie.format;
    movieEntity.duration = movie.duration;
    movieEntity.category = movie.category;
    movieEntity.summary = movie.summary;
    movieEntity.keywords = movie.keywords;
    movieEntity.targeted_audience = movie.targeted_audience;
    movieEntity.original_language = movie.original_language;
    movieEntity.series = movie.series;
    movieEntity.awards = movie.awards;
    movieEntity.actors = movie.actors;
    movieEntity.budget = movie.budget;
    movieEntity.box_office = movie.box_office || 0;

    return movieEntity;
  });

  await Movie.save(movieEntities);
  console.info(`✅ ${movieEntities.length} movies successfully imported`);
}

async function importMusicsData(jsonPath: string): Promise<void> {
  const jsonData = readFileSync(jsonPath, 'utf8');
  const musics: MusicData[] = JSON.parse(jsonData);

  console.info(`🎵 ${musics.length} musics found in JSON file`);

  await Tracklist.clear();
  await Music.clear();
  console.info('🧹 Musics table cleared');

  await resetAutoIncrement('tracklist');
  await resetAutoIncrement('music');

  const musicEntities = [];

  for (const music of musics) {
    const musicEntity = new Music();

    musicEntity.title = music.title;
    musicEntity.artists = music.artists;
    musicEntity.producers = music.producers;
    musicEntity.label = music.label;
    musicEntity.release_date = new Date(music.release_date);
    musicEntity.isbn_ean_upc = music.ISBN_EAN_UPC || '';
    musicEntity.format = typeof music.format === 'string' ? [music.format] : music.format;
    musicEntity.duration = music.duration;
    musicEntity.category = music.category;
    musicEntity.summary = music.summary;
    musicEntity.keywords = music.keywords;
    musicEntity.targeted_audience = music.targeted_audience;
    musicEntity.original_language = music.original_language;
    musicEntity.series = music.series;
    musicEntity.awards = music.awards || [];
    musicEntity.composers = music.composers || music.composer || [''];
    musicEntity.lyricists = music.lyricists || music.lyricist || [''];
    musicEntity.recording_studio = music.recording_studio;
    musicEntity.certifications = music.certifications;

    const savedMusicEntity = await musicEntity.save();

    if (music.tracklist && Array.isArray(music.tracklist)) {
      const tracklistEntities = music.tracklist.map((track) => {
        const trackEntity = new Tracklist();
        trackEntity.title = track.title;
        trackEntity.duration = track.duration;
        trackEntity.music = savedMusicEntity;
        return trackEntity;
      });

      await Tracklist.save(tracklistEntities);
    }

    musicEntities.push(savedMusicEntity);
  }

  console.info(`✅ ${musicEntities.length} musics successfully imported`);
}

async function seedDatabase() {
  try {
    await dataSource.initialize();
    console.info('📊 Database connection established');

    const datasetTypes: DatasetType[] = ['games', 'movies', 'books', 'musics'];

    for (const type of datasetTypes) {
      const jsonPath = join(__dirname, `datasets/${type}.json`);

      if (existsSync(jsonPath)) {
        console.info(`📁 Processing ${type}.json dataset`);

        switch (type) {
          case 'games':
            await importGamesData(jsonPath);
            break;
          case 'movies':
            await importMoviesData(jsonPath);
            break;
          case 'books':
            await importBooksData(jsonPath);
            break;
          case 'musics':
            await importMusicsData(jsonPath);
            break;
        }
      } else {
        console.info(`⚠️ Dataset file ${type}.json not found - skipping`);
      }
    }
  } catch (error) {
    console.error('❌ Error during data import:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.info('🔌 Database connection closed');
    }
  }
}

seedDatabase().then(() => {
  console.info('🌱 Seeding process completed');
});
