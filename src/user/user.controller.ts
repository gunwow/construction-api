import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from '../auth/decorator/req-user.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { User } from './model/user.model';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@ReqUser() user: User): Promise<User> {
    return user;
  }
}
