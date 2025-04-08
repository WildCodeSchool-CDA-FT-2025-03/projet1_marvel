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
            console.info(`ℹ️ Movies import not implemented yet - ${type}.json found but skipped`);
            break;
          case 'books':
            await importBooksData(jsonPath);
            break;
          case 'musics':
            console.info(`ℹ️ Musics import not implemented yet - ${type}.json found but skipped`);
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
