import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/crud';
import { Organization } from './model/organization.model';

@Injectable()
export class OrganizationRepository extends BaseRepository<Organization> {
  constructor() {
    super(Organization);
  }
}
