/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idEjecutivo: number;

  @Column()
  fecha: Date;
}