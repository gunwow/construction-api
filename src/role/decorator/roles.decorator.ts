import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../type/role.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
