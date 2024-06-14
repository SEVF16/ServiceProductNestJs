import { ApiProperty } from '@nestjs/swagger';

export class ProductoDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  categoryIdFk: number; 
}
