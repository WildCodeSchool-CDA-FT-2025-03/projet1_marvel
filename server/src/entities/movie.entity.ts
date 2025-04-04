import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subtitle?: string;

  @Field(() => [String])
  @Column('text', { array: true })
  directors: string[];

  @Field(() => [String])
  @Column('text', { array: true })
  writers: string[];

  @Field(() => [String])
  @Column('text', { array: true })
  producers: string[];

  @Field(() => [String])
  @Column('text', { array: true })
  studios: string[];

  @Field()
  @Column()
  release_date: string;

  @Field()
  @Column()
  isbn_ean_upc: string;

  @Field()
  @Column()
  format: string;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column('text')
  summary: string;

  @Field(() => [String])
  @Column('text', { array: true })
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

  @Field(() => [String])
  @Column('text', { array: true })
  awards: string[];

  @Field(() => [String])
  @Column('text', { array: true })
  actors: string[];

  @Field()
  @Column()
  budget: number;

  @Field()
  @Column()
  box_office: number;
}
