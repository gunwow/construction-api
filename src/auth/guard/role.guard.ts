import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequest } from '../../common/http/type/request.interface';
import { User } from '../../user/model/user.model';
import { Role } from '../../user/type/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: Role[] = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles || roles.length === 0) {
      return true;
    }
    const request: IRequest = context.switchToHttp().getRequest();
    const user: User = request.user;
    return this.matchRoles(user.role, roles);
  }

  matchRoles(userRole: Role, roles: Role[]) {
    return roles.includes(userRole);
  }
}
