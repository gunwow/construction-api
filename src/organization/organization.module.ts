import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationRepository } from './organization.repository';
import { OrganizationService } from './organization.service';
import { UserOrganizationRepository } from './user-organization.repository';

@Module({
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    OrganizationRepository,
    UserOrganizationRepository,
  ],
  exports: [
    OrganizationService,
    OrganizationRepository,
    UserOrganizationRepository,
  ],
})
export class OrganizationModule {}
