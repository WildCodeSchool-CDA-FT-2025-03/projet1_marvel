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
  @Column('simple-array')
  directors: string[];

  @Field(() => [String])
  @Column('simple-array')
  writers: string[];

  @Field(() => [String])
  @Column('simple-array')
  producers: string[];

  @Field(() => [String])
  @Column('simple-array')
  studios: string[];

  @Field()
  @Column()
  release_date: string;

  @Field()
  @Column()
  isbn_ean_upc: string;

  @Field(() => [String])
  @Column('simple-array')
  format: string[];

  @Field()
  @Column()
  duration: number;

  @Field(() => [String])
  @Column('simple-array')
  category: string[];

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

  @Field(() => [String])
  @Column('simple-array')
  awards: string[];

  @Field(() => [String])
  @Column('simple-array')
  actors: string[];

  @Field()
  @Column()
  budget: number;

  @Field()
  @Column()
  box_office: number;
}
