import { ApiProperty } from '@nestjs/swagger';
export class CategoryDto {
  @ApiProperty()
  nombre: string;
}
