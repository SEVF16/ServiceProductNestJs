/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entity/product.entity';
import { ProductoDto } from '../../dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) 
    private productRepository: Repository<Product>){}
        
    async obtenerProducts(): Promise<Product[]> {
      return this.productRepository.find();
    }

  async obtenerProduct(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id }});
  }

  async crearProduct(productDto: ProductoDto): Promise<Product> {
    return this.productRepository.save(this.productRepository.create(productDto));
  }

  async actualizarProduct(id: number, productDto: ProductoDto): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      product.nombre = productDto.nombre;
      product.descripcion = productDto.descripcion;
      product.precio = productDto.precio;
      product.categoryIdFk = productDto.categoryIdFk; 
      return this.productRepository.save(product);
    }
    return null;
  }

  async eliminarProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}

