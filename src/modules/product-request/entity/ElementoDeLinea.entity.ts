/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ElementoDeLinea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idSolicitud: number;

  @Column()
  idProducto: number;

  @Column()
  cantidad: number;

  @Column()
  precio: number;
}