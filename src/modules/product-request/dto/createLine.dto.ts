import { ApiProperty } from "@nestjs/swagger";

export class CreateLineItemDto {
    @ApiProperty()
    idProduct: number;
    @ApiProperty()
    cantidad: number;

  }