import { BaseCrudService } from '../common/crud';
import { Role } from './model/role.model';
import { RoleRepository } from './role.repository';

export class RoleService extends BaseCrudService<Role, RoleRepository> {
  constructor(public readonly repository: RoleRepository) {
    super(repository);
  }
}
