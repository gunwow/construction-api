import { Role } from '../../user/type/role.enum';

export class JwtPayloadDTO {
  userId: string;
  role: Role;
  isRefresh?: boolean;
  data?: string;
}
