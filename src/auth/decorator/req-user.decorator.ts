import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequest } from '../../common/http/type/request.interface';

export const ReqUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: IRequest = context.switchToHttp().getRequest();
    return request.user;
  },
);
