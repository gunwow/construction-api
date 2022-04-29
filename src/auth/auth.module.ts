import { Module } from '@nestjs/common';
import { HashModule } from '../hash/hash.module';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, HashModule, RoleModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
