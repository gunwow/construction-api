import { Injectable } from '@nestjs/common';
import {
  BaseRepository,
  PaginatedSet,
  ResultsWithCountSet,
} from '../common/crud';
import { BarberShop } from './model/barber-shop.model';

@Injectable()
export class BarberShopRepository extends BaseRepository<BarberShop> {
  constructor() {
    super(BarberShop);
  }

  async findByUserId(userId: string): Promise<ResultsWithCountSet<BarberShop>> {
    return this.findAndCountAll({ where: { userId } });
  }
}
