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

    @Get("/api/produc")
    async findSolicitud(){
      return this.solicitudService.getSolicitudesWithProducts();
    }

    @Get("/solicitudes")
    async solicitudes(){
      return this.solicitudService.obtenerSolicitudConProductos(3);
    }

    @Get("/solicitudes/pr")
    async solicitudesPr(){
      return this.solicitudService.obtenerSolicitudesConElementosYProductos();
    }

    @Get("/elemnt/pr")
    async elemnto(){
      return this.solicitudService.obtenerElementosConProductos();
    }

    @Get()
    async findAll() {
      return this.solicitudService.findAll();
    }

    @Post()
    async create(@Body() createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
      return this.solicitudService.create(createSolicitudDto);
    }
}
