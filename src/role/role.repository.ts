import { BaseRepository } from '../common/crud';
import { Role } from './model/role.model';

export class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role);
  }
}
