import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from '../auth/decorator/req-user.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { PaginatedSet } from '../common/crud';
import { QueryParamsDTO } from '../common/http/query-params.dto';
import { Roles } from '../role/decorator/roles.decorator';
import { RoleGuard } from '../role/guard/role.guard';
import { RoleEnum } from '../role/type/role.enum';
import { User } from '../user/model/user.model';
import { OrganizationDTO } from './dto/organization.dto';
import { Organization } from './model/organization.model';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  async find(
    @Query() query: QueryParamsDTO,
  ): Promise<PaginatedSet<Organization[]>> {
    return this.organizationService.findPaginated(query);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.MANAGER)
  @Get('mine')
  async findForUser(
    @ReqUser() user: User,
    @Query() query: QueryParamsDTO,
  ): Promise<PaginatedSet<Organization[]>> {
    return this.organizationService.findForUser(user, query);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.MANAGER)
  @Post()
  async createForUser(
    @ReqUser() user: User,
    @Body() payload: OrganizationDTO,
  ): Promise<Organization> {
    return this.organizationService.createForUser(user, payload);
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.organizationService.findByIdOrFail(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.MANAGER)
  @Put(':id')
  async update(
    @ReqUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: OrganizationDTO,
  ) {
    return this.organizationService.updateForUser(user, id, payload);
  }
}
