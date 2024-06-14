/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../../service/product/product.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductoDto } from '../../dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  obtenerProducts() {
    return this.productService.obtenerProducts();
  }

  @Get(':id')
  obtenerProduct(@Param('id') id: number) {
    return this.productService.obtenerProduct(id);
  }

  @Post()
  crearProduct(@Body() productDto: ProductoDto) {
    return this.productService.crearProduct(productDto);
  }

  @Put(':id')
  actualizarProduct(@Param('id') id: number, @Body() productDto: ProductoDto) {
    return this.productService.actualizarProduct(id, productDto);
  }

  @Delete(':id')
  eliminarProduct(@Param('id') id: number) {
    return this.productService.eliminarProduct(id);
  }
}
