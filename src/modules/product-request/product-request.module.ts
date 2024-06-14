import { Module } from '@nestjs/common';
import { ProductRequestController } from './controller/product-request/product-request.controller';
import { ProductRequestService } from './service/product-request/product-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './entity/solicitud.entity';
import { ElementoDeLinea } from './entity/ElementoDeLinea.entity';
import { Product } from '../product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud, ElementoDeLinea, Product])],
  controllers: [ProductRequestController],
  providers: [ProductRequestService],
})
export class ProductRequestModule {}
