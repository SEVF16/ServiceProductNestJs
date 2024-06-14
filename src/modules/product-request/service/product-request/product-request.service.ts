/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Solicitud } from '../../entity/solicitud.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSolicitudDto } from '../../dto/createSolicitud.dto';
import { ElementoDeLinea } from '../../entity/ElementoDeLinea.entity';
import { Product } from 'src/modules/product/entity/product.entity';

@Injectable()
export class ProductRequestService {
    constructor(
        @InjectRepository(Solicitud)
        private solicitudRepository: Repository<Solicitud>,
        @InjectRepository(ElementoDeLinea)
        private elementoDeLineaRepository: Repository<ElementoDeLinea>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
      ) {}
      
      async findAll(): Promise<any[]> {
        const results = await this.solicitudRepository.query('CALL ListarSolicitudes()');
        
        return results;
    }

      async create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
        const { idEjecutivo, fecha, lineItems } = createSolicitudDto;
    
        
        const productosJson = JSON.stringify(lineItems);
    
        
        await this.solicitudRepository.query(
          'CALL CreateSolicitud(?, ?, ?)',
          [idEjecutivo, '2024-06-13', productosJson]
        );
    
        
        const solicitudes = await this.solicitudRepository.find({
          where: { idEjecutivo, fecha },
          
        });
    
        
        return solicitudes[solicitudes.length - 1];
      }

}
