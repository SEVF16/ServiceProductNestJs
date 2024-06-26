import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

}
