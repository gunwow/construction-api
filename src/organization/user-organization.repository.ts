import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/crud';
import { UserOrganization } from './model/user-organization.model';

@Injectable()
export class UserOrganizationRepository extends BaseRepository<UserOrganization> {
  constructor() {
    super(UserOrganization);
  }
}
