import { ForbiddenException, Injectable } from '@nestjs/common';
import { Includeable } from 'sequelize/types';
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

  private resolveUserJoinClause(user: User): Includeable {
    return {
      model: User,
      required: false,
      through: { where: { userId: user.id } },
    };
  }

  async findForUser(
    user: User,
    query: QueryParamsDTO,
  ): Promise<PaginatedSet<Organization[]>> {
    return this.findPaginated(query, {
      include: [this.resolveUserJoinClause(user)],
    });
  }

  async findOneForUser(user: User) {
    return this.findOne({
      include: [this.resolveUserJoinClause(user)],
    });
  }

  async createForUser(
    user: User,
    payload: ModelPayload<Organization>,
  ): Promise<Organization> {
    const existingOganization: Organization = await this.findOneForUser(user);
    if (existingOganization) {
      throw new ForbiddenException(`Can't have more than 1 organization`);
    }

    const organization: Organization = await super.create(payload);

    await this.userOrganizationRepository.create({
      userId: user.id,
      organizationId: organization.id,
    });

    return organization;
  }
}
