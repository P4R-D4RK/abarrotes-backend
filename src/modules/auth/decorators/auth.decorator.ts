import { Role } from '../types/role.types';
import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata('roles', roles),
    UseGuards(AuthGuard),
    ApiOperation({
      summary: `[${roles.length > 0 ? roles[0] : ''}${
        roles.length > 1 ? ', ' + roles[1] : ''
      }${roles.length > 2 ? ', ' + roles[2] : ''}]`,
    }),
    ApiUnauthorizedResponse({
      description: 'Not authorized to perform the request',
    }),
  );
}
