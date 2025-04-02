import { DataSource } from 'typeorm';

import { Hello } from '../entities/hello.entity';
import { Game } from '../entities/game.entity';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './db.sqlite',
  entities: [Hello, Game],
  synchronize: true,
  logging: true,
});
