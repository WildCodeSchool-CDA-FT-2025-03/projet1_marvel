import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  titre: string;

  @Field(() => [String])
  @Column('simple-array')
  auteurs: string[];

  @Field()
  @Column()
  editeur: string;

  @Field()
  @Column()
  date_publication: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isbn: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  format: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nombre_pages: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  genre: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  resume: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  mots_cles: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  public_cible: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  langue_originale: string;

  @Field()
  @Column({ default: false })
  serie: boolean;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  extrait: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  prix_distinctions: string;
}
