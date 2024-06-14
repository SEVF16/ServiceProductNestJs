/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRequestService } from '../../service/product-request/product-request.service';
import { CreateSolicitudDto } from '../../dto/createSolicitud.dto';
import { Solicitud } from '../../entity/solicitud.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product-request')
@Controller('product-request')
export class ProductRequestController {

    constructor(private readonly solicitudService: ProductRequestService) {}

    @Get()
    async findAll() {
      return this.solicitudService.findAll();
    }

    @Post()
    async create(@Body() createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
      return this.solicitudService.create(createSolicitudDto);
    }
}
