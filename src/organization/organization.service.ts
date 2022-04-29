import { Injectable } from '@nestjs/common';
import { BaseCrudService, ModelPayload, PaginatedSet } from '../common/crud';
import { QueryParamsDTO } from '../common/http/query-params.dto';
import { User } from '../user/model/user.model';
import { Organization } from './model/organization.model';
import { OrganizationRepository } from './organization.repository';
import { UserOrganizationRepository } from './user-organization.repository';

@Injectable()
export class OrganizationService extends BaseCrudService<
  Organization,
  OrganizationRepository
> {
  constructor(
    public readonly repository: OrganizationRepository,
    private readonly userOrganizationRepository: UserOrganizationRepository,
  ) {
    super(repository);
  }

  async findForUser(
    user: User,
    query: QueryParamsDTO,
  ): Promise<PaginatedSet<Organization[]>> {
    return this.findPaginated(query, {
      include: [{ model: User, required: true }],
    });
  }

  async createForUser(
    user: User,
    payload: ModelPayload<Organization>,
  ): Promise<Organization> {
    const organization: Organization = await super.create(payload);

    await this.userOrganizationRepository.create({
      userId: user.id,
      organizationId: organization.id,
    });

    return organization;
  }
}
