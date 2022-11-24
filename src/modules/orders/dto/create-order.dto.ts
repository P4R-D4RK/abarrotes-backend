import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  product: number;
}
