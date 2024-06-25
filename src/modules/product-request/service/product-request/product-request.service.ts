/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Solicitud } from '../../entity/solicitud.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSolicitudDto } from '../../dto/createSolicitud.dto';
import { elementodelinea } from '../../entity/elementodelinea.entity';
import { Product } from 'src/modules/product/entity/product.entity';

 
export class SolicitudDto {
  id: number;
  idEjecutivo: number;
  fecha: Date;
  productos: Array<{ nombre: string; precio: number; cantidad: number }>;
}
@Injectable()
export class ProductRequestService {
  constructor(
      @InjectRepository(Solicitud)
      private solicitudRepository: Repository<Solicitud>,
      @InjectRepository(elementodelinea)
      private elementoDeLineaRepository: Repository<elementodelinea>,
      @InjectRepository(Product)
      private productRepository: Repository<Product>,
    ) {}
    
  async findAll(): Promise<any[]> {
    const results = await this.solicitudRepository.query('CALL ListarSolicitudes()');

    // Transformar el campo productos de cada resultado
    const transformedResults = results[0].map(result => ({
      id: result.id,
      idEjecutivo: result.idEjecutivo,
      fecha: result.fecha,
      productos: result.productos ? JSON.parse(result.productos) : [],// Convertir productos de cadena JSON a objeto JavaScript
      estadoSolicitud: result.estadoSolicitud
    }));

    return transformedResults;
  }

  async create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    const { idEjecutivo, fecha, lineItems } = createSolicitudDto;
    
    const productosJson = JSON.stringify(lineItems);
    console.log(typeof(fecha));
    
    await this.solicitudRepository.query(
      'CALL CreateSolicitud(?, ?, ?)',
      [idEjecutivo, fecha, productosJson]
    );

    
    const solicitudes = await this.solicitudRepository.find({
      where: { idEjecutivo, fecha },
      
    });

    
    return solicitudes[solicitudes.length - 1];
  }

  async obtenerSolicitudConProductos(solicitudId: number) {
    const queryBuilder = this.solicitudRepository.createQueryBuilder('solicitud');

    queryBuilder
      .select([
        'solicitud.id',
        'solicitud.idEjecutivo',
        'solicitud.fecha',
        'solicitud.estadoSolicitud',
      ])
      .leftJoin(
        (qb) =>
          qb
            .subQuery()
            .select([
              'elementoDeLinea.id',
              'producto.nombre',
              'producto.precio',
              'elementoDeLinea.cantidad',
            ])
            .from('elementodelinea', 'elementoDeLinea')
            .leftJoin('elementoDeLinea.product', 'producto')
            .where('elementoDeLinea.solicitud = :solicitudId')
            .getQuery(),
        'productos',
        'solicitud.id = productos.idSolicitud',
      )
      .setParameter('solicitudId', solicitudId)
      .getOne();

    return queryBuilder;
  }

  async obtenerSolicitudesConElementosYProductos() {
    const queryBuilder = this.solicitudRepository.createQueryBuilder('solicitud');
  
    queryBuilder
      .leftJoinAndSelect('solicitud.elementosDeLinea', 'elementoDeLinea')
      .leftJoinAndSelect('elementoDeLinea.product', 'producto');
  
    return queryBuilder.getMany();
  }

  async obtenerElementosConProductos() {
    const queryBuilder = this.elementoDeLineaRepository.createQueryBuilder('elementoDeLinea');

    queryBuilder.leftJoinAndSelect('elementoDeLinea.product', 'producto');

    return queryBuilder.getMany();
  }

  async obtenerSolicitudes() {
    const queryBuilder = this.solicitudRepository.createQueryBuilder('solicitud');

    queryBuilder.leftJoinAndSelect('solicitud.elementosDeLinea', 'elementodelinea.id');

    return queryBuilder.getMany();
  }

  async getSolicitudesWithProducts() {

    const queryBuilder = this.solicitudRepository.createQueryBuilder('solicitud');

    queryBuilder
      .leftJoinAndSelect('solicitud.elementoDeLinea', 'elementoDeLinea')
      .leftJoinAndSelect('elementoDeLinea.idProducto', 'producto');
  
    return queryBuilder.getMany();
    // const queryBuilder = this.solicitudRepository.createQueryBuilder(Solicitud)
    // // Obtener solicitudes con sus elementos de línea y productos
    // const solicitudes = await solicitudRepository.find({
    //   relations: {
    //     elementosDeLinea: {
    //       product: true,
    //     },
    //   },
    // });
  
    // // Extraer productos de las solicitudes
    // const solicitudesWithProducts = solicitudes.map(solicitud => ({
    //   id: solicitud.id,
    //   idEjecutivo: solicitud.idEjecutivo,
    //   fecha: solicitud.fecha,
    //   estadoSolicitud: solicitud.estadoSolicitud,
    //   productos: solicitud.elementosDeLinea.map(elemento => elemento.product),
    // }));
  
    // console.log(solicitudesWithProducts);
  }

}
