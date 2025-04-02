import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('game')
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subtitle: string;

  @Field(() => [String])
  @Column('simple-array')
  developers: string[];

  @Field(() => [String])
  @Column('simple-array')
  publishers: string[];

  @Field()
  @Column({ type: 'date' })
  release_date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isbn: string;

  @Field()
  @Column()
  format: string;

  @Field(() => [String])
  @Column('simple-array')
  platforms: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column('text')
  summary: string;

  @Field(() => [String])
  @Column('simple-array')
  keywords: string[];

  @Field()
  @Column()
  targeted_audience: string;

  @Field()
  @Column()
  original_language: string;

  @Field()
  @Column()
  series: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'text' })
  extract: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  awards: string[];

  @Field(() => [String])
  @Column('simple-array')
  game_modes: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  game_engine: string;

  @Field()
  @Column()
  pegi_esrb_rating: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  online_features: string[];

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  dlc_expansions: string[];

  @Field(() => [String])
  @Column('simple-array')
  gameplay_mechanics: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  soundtrack: string;

  @Field(() => [String])
  @Column('simple-array')
  available_on: string[];

  @Field()
  @Column()
  mod_support: string;
}
