import { Module } from '@nestjs/common';
import { BarberShopController } from './barber-shop.controller';
import { BarberShopRepository } from './barber-shop.repository';
import { BarberShopService } from './barber-shop.service';

@Module({
  providers: [BarberShopRepository, BarberShopService],
  controllers: [BarberShopController],
  exports: [BarberShopService],
})
export class BarberShopModule {}
