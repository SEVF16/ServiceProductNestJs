/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from '../../service/category/category.service';
import { Category } from '../../entity/category.entity';
import { CategoryDto } from '../../dto/category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  obtenerCategorys(): Promise<Category[]> {
    return this.categoryService.obtenerCategorys();
  }

  @Get(':id')
  obtenerCategory(@Param('id') id: number): Promise<Category> {
    return this.categoryService.obtenerCategory(id);
  }

  @Post()
  crearCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.crearCategory(categoryDto);
  }


  @Put(':id')
  actualizarCategory(@Param('id') id: number, @Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.actualizarCategory(id, categoryDto);
  }
  

  @Delete(':id')
  eliminarCategory(@Param('id') id: number): Promise<void> {
    return this.categoryService.eliminarCategory(id);
  }
}