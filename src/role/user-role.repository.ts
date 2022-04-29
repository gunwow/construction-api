import { BaseRepository } from '../common/crud';
import { UserRole } from './model/user-role.model';

export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor() {
    super(UserRole);
  }
}
