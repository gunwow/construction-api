import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReqUser } from '../auth/decorator/req-user.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { User } from './model/user.model';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  @Get('me')
  async me(@ReqUser() user: User): Promise<User> {
    return user;
  }
}
