import { ApiProperty } from "@nestjs/swagger";

export class CreateLineItemDto {
    @ApiProperty()
    idProducto: number;
    @ApiProperty()
    cantidad: number;

  }