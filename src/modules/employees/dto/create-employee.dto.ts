import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
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

  @ApiProperty({ minLength: 3, maxLength: 128 })
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 3, maxLength: 64 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  password: string;

  @ApiProperty({})
  @IsDefined()
  @IsDateString()
  birthday: Date;

  @ApiProperty({ maxLength: 13, minLength: 13, required: false })
  @IsOptional()
  @MinLength(13)
  @MaxLength(13)
  @Matches(
    /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
  )
  rfc?: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  salary: number;

  @ApiProperty({ minLength: 3, maxLength: 64 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  maritalStatus: string;

  @ApiProperty({ minLength: 3, maxLength: 64 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  education: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  administrator: boolean;
}
