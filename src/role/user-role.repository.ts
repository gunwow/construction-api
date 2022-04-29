import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/crud';
import { UserRole } from './model/user-role.model';

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor() {
    super(UserRole);
  }
}
