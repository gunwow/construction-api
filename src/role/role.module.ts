import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { UserRoleRepository } from './user-role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, UserRoleRepository],
  exports: [RoleService, RoleRepository, UserRoleRepository],
})
export class RoleModule {}
