import { readFileSync } from 'fs';

import resetAutoIncrement from '../resetAutoIncrement';

import { MovieData } from '../../../types/movie.type';
import { Movie } from '../../../entities/movie.entity';

export default async function importMoviesData(jsonPath: string): Promise<void> {
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
