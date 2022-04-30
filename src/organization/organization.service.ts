import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';
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
      required: true,
      through: { where: { userId: user.id } },
    };
  }

  async findForUser(
    user: User,
    query: QueryParamsDTO,
    options?: FindOptions<Organization>,
  ): Promise<PaginatedSet<Organization[]>> {
    return this.findPaginated(query, {
      ...options,
      include: [this.resolveUserJoinClause(user)],
    });
  }

  async findOneForUser(
    user: User,
    options?: FindOptions<Organization>,
  ): Promise<Organization> {
    return this.findOne({
      ...options,
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

  async updateForUser(
    user: User,
    id: string,
    payload: ModelPayload<Organization>,
  ): Promise<Organization> {
    if (!(await this.findOneForUser(user, { where: { id } }))) {
      throw new NotFoundException('Model not found.');
    }

    const organization: Organization = await this.update(id, payload);
    return organization;
  }
}
