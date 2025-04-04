import { DataSource } from 'typeorm';

import { Game } from '../entities/game.entity';
import { Hello } from '../entities/hello.entities';
import { Movie } from '../entities/movie.entity';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './db.sqlite',
  entities: [Hello, Game, Movie],
  synchronize: true,
  logging: true,
});
