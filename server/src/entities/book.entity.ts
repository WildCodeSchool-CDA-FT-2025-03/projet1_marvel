import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column('simple-array')
  auteurs: string[];

  @Column()
  editeur: string;

  @Column()
  date_publication: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ nullable: true })
  format: string;

  @Column({ nullable: true })
  nombre_pages: number;

  @Column({ nullable: true })
  genre: string;

  @Column({ type: 'text', nullable: true })
  resume: string;

  @Column('simple-array', { nullable: true })
  mots_cles: string[];

  @Column({ nullable: true })
  public_cible: string;

  @Column({ nullable: true })
  langue_originale: string;

  @Column({ default: false })
  serie: boolean;

  @Column({ type: 'text', nullable: true })
  extrait: string;

  @Column({ nullable: true })
  prix_distinctions: string;
}
