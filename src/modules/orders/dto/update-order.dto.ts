import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
