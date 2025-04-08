import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Music } from './music.entity';

@ObjectType()
@Entity()
export class Tracklist {
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
