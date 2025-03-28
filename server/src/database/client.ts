import { DataSource } from 'typeorm';

import { Hello } from '../entities/hello.entities';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './db.sqlite',
  entities: [Hello],
  synchronize: true,
  logging: true,
});
