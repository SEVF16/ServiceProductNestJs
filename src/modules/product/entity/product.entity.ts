/* eslint-disable prettier/prettier */
import { elementodelinea } from 'src/modules/product-request/entity/elementodelinea.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @Column({ name: 'categoryId' })
  categoryIdFk: number;

  @OneToMany(() => elementodelinea, elementoDeLinea => elementoDeLinea.product)
  elementosDeLinea: elementodelinea[];
}
