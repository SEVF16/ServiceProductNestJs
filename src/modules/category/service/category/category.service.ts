import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entity/category.entity';
import { CategoryDto } from '../../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async obtenerCategorys(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['productos'] });
  }

  async obtenerCategory(id: number): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['productos'],
    });
  }

  async crearCategory(categoryDto: CategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(categoryDto);
    return this.categoryRepository.save(category);
  }

  async actualizarCategory(
    id: number,
    categoryDto: CategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    category.nombre = categoryDto.nombre;
    return this.categoryRepository.save(category);
  }

  async eliminarCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
