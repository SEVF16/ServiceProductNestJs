import { ApiProperty } from "@nestjs/swagger";
import { CreateLineItemDto } from "./createLine.dto"; 

export class CreateSolicitudDto {
  @ApiProperty()
  idEjecutivo: number;
  @ApiProperty()
  fecha: Date;
  @ApiProperty({ type: () => [CreateLineItemDto] }) 
  lineItems: CreateLineItemDto[];
}