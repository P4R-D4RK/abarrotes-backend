import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../types/role.types';

export class ResponseLogInDto {
  @ApiProperty({ enum: ['administrator', 'employee', 'client'] })
  role: Role;

  @ApiProperty()
  id: number;

  @ApiProperty()
  token: string;
}
