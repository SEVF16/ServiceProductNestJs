import { Category } from 'src/modules/category/entity/category.entity';

export class ProductoDto {
  nombre: string;
  descripcion: string;
  precio: number;
  category: Category;
}
