import { Module } from '@nestjs/common';
import { ProductRequestController } from './controller/product-request/product-request.controller';
import { ProductRequestService } from './service/product-request/product-request.service';

@Module({
  controllers: [ProductRequestController],
  providers: [ProductRequestService],
})
export class ProductRequestModule {}
