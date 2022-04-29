import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequest } from '../../common/http/type/request.interface';
import { User } from '../../user/model/user.model';
import { Role } from '../model/role.model';
import { RoleEnum } from '../type/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] =
      this.reflector
        .get<RoleEnum[]>('roles', context.getHandler())
        ?.map((role: RoleEnum) => role.toString()) || [];

    if (!roles || roles.length === 0) {
      return true;
    }
    const request: IRequest = context.switchToHttp().getRequest();
    const user: User = request.user;

    return this.matchRoles(user.roles, roles);
  }

  matchRoles(userRoles: Role[], roles: string[]): boolean {
    return userRoles.every((userRole: Role) => roles.includes(userRole.name));
  }
}
