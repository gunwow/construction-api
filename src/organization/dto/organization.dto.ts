import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrganizationDTO {
  @IsString()
  @IsOptional()
  logo?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  jib: string;
}
