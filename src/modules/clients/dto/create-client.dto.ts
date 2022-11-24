import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  MaxLength,
  MinLength,
  IsString,
  IsDateString,
  Matches,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ minLength: 3, maxLength: 64 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  name: string;

  @ApiProperty({ minLength: 3, maxLength: 64 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  firstLastName: string;

  @ApiProperty({ minLength: 3, maxLength: 64 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  secondLastName: string;

  @ApiProperty()
  @IsDefined()
  @IsDateString()
  birthday: Date;

  @ApiProperty({ minLength: 13, maxLength: 13 })
  @IsOptional()
  @IsString()
  @MinLength(13)
  @MaxLength(13)
  @Matches(
    /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
  )
  rfc?: string;

  @ApiProperty({ minLength: 3, maxLength: 128 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(128)
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({ minLength: 3, maxLength: 64 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  password: string;
}
