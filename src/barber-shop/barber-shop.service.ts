import { ForbiddenException, Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud';
import { User } from '../user/model/user.model';
import { BarberShopRepository } from './barber-shop.repository';
import { BarberShopDTO } from './dto/barber-shop.dto';
import { BarberShop } from './model/barber-shop.model';

@Injectable()
export class BarberShopService extends BaseCrudService<
  BarberShop,
  BarberShopRepository
> {
  constructor(public readonly repository: BarberShopRepository) {
    super(repository);
  }

  async createForUser(user: User, payload: BarberShopDTO): Promise<BarberShop> {
    const { count: total } = await this.repository.findByUserId(user.id);

    if (total >= 1) {
      throw new ForbiddenException(
        `User can't have more than ${1} barber shops.`,
      );
    }

    return this.create({
      userId: user.id,
      ...payload,
    });
  }
}
