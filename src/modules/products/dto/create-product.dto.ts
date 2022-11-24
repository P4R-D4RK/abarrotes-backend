import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  presentation: string;

  @ApiProperty()
  @IsDefined()
  @IsDateString()
  expiration: Date;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  providerPrice: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  //   @Matches(/^\d+$/)
  existence: number;

  @ApiProperty()
  @IsDefined()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  brand: string;
}
