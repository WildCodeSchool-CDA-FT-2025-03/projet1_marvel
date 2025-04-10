import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Tracklist } from './tracklist.entity';

@ObjectType()
@Entity()
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column('simple-array')
  @Field(() => [String])
  artists: string[];

  @Column('simple-array')
  @Field(() => [String])
  producers: string[];

  @Column()
  @Field()
  label: string;

  @Column()
  @Field()
  release_date: string;

  @Column()
  @Field()
  isbn_ean_upc: string;

  @Column('simple-array')
  @Field(() => [String])
  format: string[];

  @Column()
  @Field()
  duration: number;

  @Column()
  @Field()
  category: string;

  @Column()
  @Field()
  summary: string;

  @Column('simple-array')
  @Field(() => [String])
  keywords: string[];

  @Column()
  @Field()
  targeted_audience: string;

  @Column()
  @Field()
  original_language: string;

  @Column()
  @Field()
  series: boolean;

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  awards: string[];

  @Column('simple-array')
  @Field(() => [String])
  composers: string[];

  @Column('simple-array')
  @Field(() => [String])
  lyricists: string[];

  @Column()
  @Field()
  recording_studio: string;

  @Column('simple-array')
  @Field(() => [String])
  certifications: string[];

  @OneToMany(() => Tracklist, (tracklist) => tracklist.music, { cascade: true })
  @Field(() => [Tracklist])
  tracklist?: Tracklist[];
}
