import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { PaginatedSet } from '../common/crud';
import { Role } from './model/role.model';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<PaginatedSet<Role[]>> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Role> {
    return this.roleService.findByIdOrFail(id);
  }
}
