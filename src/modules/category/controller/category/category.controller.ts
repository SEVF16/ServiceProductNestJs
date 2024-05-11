import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { CategoryService } from "../../service/category/category.service";
import { Category } from "../../entity/category.entity";
import { CategoryDto } from "../../dto/category.dto";

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  obtenerCategorys(): Promise<Category[]> {
    return this.categoryService.obtenerCategorys();
  }

  @Get(":id")
  obtenerCategory(@Param("id") id: number): Promise<Category> {
    return this.categoryService.obtenerCategory(id);
  }

  @Post()
  crearCategory(@Body() CategoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.crearCategory(CategoryDto);
  }


  @Put(":id")
  actualizarCategory(@Param("id") id: number, @Body() CategoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.actualizarCategory(id, CategoryDto);
  }
  

  @Delete(":id")
  eliminarCategory(@Param("id") id: number): Promise<void> {
    return this.categoryService.eliminarCategory(id);
  }
}