import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hello')
export class Hello extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;
}
