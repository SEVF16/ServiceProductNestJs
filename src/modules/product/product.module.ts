import { Module } from '@nestjs/common';
import { ProductService } from './service/product/product.service';
import { ProductController } from './controller/product/product.controller';
import { Product } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
