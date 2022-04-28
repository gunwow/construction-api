import { Role } from '../../role/model/role.model';

export class JwtPayloadDTO {
  userId: string;
  roles: Role[];
  isRefresh?: boolean;
  data?: string;
}
