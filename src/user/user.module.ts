import { Module } from '@nestjs/common';
import { HashModule } from '../hash/hash.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [HashModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
