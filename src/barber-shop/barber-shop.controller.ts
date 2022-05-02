import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReqUser } from '../auth/decorator/req-user.decorator';
import { Roles } from '../auth/decorator/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { User } from '../user/model/user.model';
import { Role } from '../user/type/role.enum';
import { BarberShopService } from './barber-shop.service';
import { BarberShopDTO } from './dto/barber-shop.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('barber-shops')
export class BarberShopController {
  constructor(private readonly barberShopService: BarberShopService) {}

  @Post()
  @Roles(Role.BARBER)
  async create(@ReqUser() user: User, @Body() payload: BarberShopDTO) {
    return this.barberShopService.createForUser(user, payload);
  }
}
