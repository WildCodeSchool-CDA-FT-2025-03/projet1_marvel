import { join } from 'path';
import { existsSync } from 'fs';
import 'reflect-metadata';
import 'dotenv/config';

import importGamesData from './utils/import/importGamesData';
import importBooksData from './utils/import/importBooksData';
import importMoviesData from './utils/import/importMoviesData';
import importMusicsData from './utils/import/importMusicsData';

import { dataSource } from './client';
import { DatasetType } from '../types/dataset.type';

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
