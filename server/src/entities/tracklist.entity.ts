import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Music } from './music.entity';

@ObjectType()
@Entity()
export class Tracklist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  duration: string;

  @ManyToOne(() => Music, (music) => music.tracklist)
  music?: Music;
}

// définition des iInput pour Tracklist
@InputType()
export class TrackListInput {
  @Field()
  title: string;

  @Field()
  duration: string;
}
