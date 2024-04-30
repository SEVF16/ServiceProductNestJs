import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './src/modules/category/category.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ProductRequestModule } from './modules/product-request/product-request.module';
import { CategoryController } from './modules/controller/category/category.controller';

@Module({
  imports: [CategoryModule, ProductModule, ProductRequestModule],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
