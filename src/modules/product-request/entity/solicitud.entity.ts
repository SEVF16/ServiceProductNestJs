/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { elementodelinea } from './elementodelinea.entity';


@Entity()
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idEjecutivo: number;

  @Column()
  fecha: Date;

  @Column()
  estadoSolicitud: number;

  @OneToMany(() => elementodelinea, elementoDeLinea => elementoDeLinea.solicitud)
  elementosDeLinea: elementodelinea[];
}