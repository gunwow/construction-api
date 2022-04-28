import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IRequest } from '../../common/http/type/request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: IRequest = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException(request.authError || 'Not authorized.');
    }
    return true;
  }
}
