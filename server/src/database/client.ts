import { DataSource } from 'typeorm';

import { Hello } from '../entities/hello.entities';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Hello],
  synchronize: true,
});
