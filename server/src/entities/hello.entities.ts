import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hello extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;
}
