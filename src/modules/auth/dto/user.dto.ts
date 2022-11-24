import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/modules/clients';
import { Employee } from 'src/modules/employees';
import { Role } from '../types/role.types';

export class UserDto {
  @ApiProperty({ enum: ['administrator', 'employee', 'client'] })
  role: Role;

  @ApiProperty()
  user: Employee | Client;
}
