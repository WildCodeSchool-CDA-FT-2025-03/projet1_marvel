import { DataSource } from 'typeorm';

import { Hello } from '../entities/hello.entities';
import { Game } from '../entities/game.entity';
import { Music } from '../entities/music.entity';
import { Tracklist } from '../entities/tracklist.entity';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './db.sqlite',
  entities: [Hello, Game, Music, Tracklist],
  synchronize: true,
  logging: true,
});
