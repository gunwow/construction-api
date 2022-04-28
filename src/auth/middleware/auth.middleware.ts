import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { Response } from 'express';
import { User } from '../../user/model/user.model';
import { JwtService } from '../../hash/jwt.service';
import { JwtPayloadDTO } from '../dto/jwt-payload.dto';
import { IRequest } from '../../common/http/type/request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger();

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async use(
    request: IRequest,
    response: Response,
    next: () => void,
  ): Promise<any> {
    const authorizationHeader: string = request.header('Authorization');

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      this.handleException(request, 'Bearer not provided');
      return next();
    }

    const token: string = authorizationHeader.replace('Bearer ', '');

    try {
      const { userId, isRefresh }: JwtPayloadDTO = await this.jwtService.verify(
        token,
      );

      if (isRefresh) {
        this.handleException(request, 'Refresh token provided');
        return next();
      }

      const user: User = await this.userService.findById(userId);
      if (!user) {
        this.handleException(request, 'User not found');
      }
      request.user = user;
    } catch (err) {
      this.handleException(request, err.message);
    }
    return next();
  }

  handleException(request: IRequest, message: string) {
    request.authError = message;
    this.logger.log(message);
  }
}
