import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('game')
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column('simple-array')
  developers: string[];

  @Column('simple-array')
  publishers: string[];

  @Column({ type: 'date' })
  release_date: Date;

  @Column({ nullable: true })
  isbn: string;

  @Column()
  format: string;

  @Column('simple-array')
  platforms: string[];

  @Column({ nullable: true })
  duration: string;

  @Column()
  category: string;

  @Column('text')
  summary: string;

  @Column('simple-array')
  keywords: string[];

  @Column()
  targeted_audience: string;

  @Column()
  original_language: string;

  @Column()
  series: boolean;

  @Column({ nullable: true, type: 'text' })
  extract: string;

  @Column('simple-array', { nullable: true })
  awards: string[];

  @Column('simple-array')
  game_modes: string[];

  @Column({ nullable: true })
  game_engine: string;

  @Column()
  pegi_esrb_rating: string;

  @Column('simple-array', { nullable: true })
  online_features: string[];

  @Column('simple-array', { nullable: true })
  dlc_expansions: string[];

  @Column('simple-array')
  gameplay_mechanics: string[];

  @Column({ nullable: true })
  soundtrack: string;

  @Column('simple-array')
  available_on: string[];

  @Column()
  mod_support: string;
}
