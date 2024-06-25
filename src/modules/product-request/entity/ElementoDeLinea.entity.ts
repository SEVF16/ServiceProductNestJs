/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Solicitud } from './solicitud.entity';
import { Product } from 'src/modules/product/entity/product.entity';

@Entity()
export class elementodelinea {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Solicitud, solicitud => solicitud.elementosDeLinea)
  @JoinColumn({ name: 'idSolicitud' })
  solicitud: Solicitud;

  @ManyToOne(() => Product, product => product.elementosDeLinea)
  @JoinColumn({ name: 'idProduct' })
  product: Product;

  @Column()
  cantidad: number;

  @Column()
  precio: number;
}