import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import { JwtService } from '../hash/jwt.service';
import { User } from '../user/model/user.model';
import { UserService } from '../user/user.service';
import { JwtPayloadDTO } from './dto/jwt-payload.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { v4 } from 'uuid';
import { AccessTokenDTO, AuthTokensDTO } from './dto/auth-tokens.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { Role } from '../role/model/role.model';
import { RoleService } from '../role/role.service';
import { UserRoleRepository } from '../role/user-role.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async signIn({ email, password }: SignInDTO): Promise<AuthTokensDTO> {
    const user: User = await this.userService.repository.findByEmail(email);

    if (!user || !(await this.hashService.compare(password, user.password))) {
      throw new UnauthorizedException(`Credentials don't match.`);
    }

    const accessToken: string = await this.generateAccessToken(user);
    const refreshToken: string = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async refresh({ refreshToken }: RefreshDTO): Promise<AccessTokenDTO> {
    try {
      const payload: JwtPayloadDTO = await this.jwtService.verify(refreshToken);
      if (!payload.isRefresh) {
        throw new Error('Refresh token not provided');
      }

      const user: User = await this.userService.findByIdOrFail(payload.userId);
      const accessToken: string = await this.generateAccessToken(user);

      return { accessToken };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  async signUp({ roles: initRolesIds, ...rest }: SignUpDTO): Promise<void> {
    if (await this.userService.repository.findByEmail(rest.email)) {
      throw new ConflictException(`Email is already occupied`);
    }

    const rolesIds: string[] = [initRolesIds[0]];
    const roles: Role[] = await this.roleService.repository.findAllByIds(
      rolesIds,
    );

    if (roles.length === 0) {
      throw new ConflictException(
        `You have to choose at least one valid role.`,
      );
    }

    const areRolesChoosable: boolean = roles.every(
      (role: Role) => role.isChoosable,
    );

    if (!areRolesChoosable) {
      throw new ConflictException('Some of the roles are forbidden.');
    }

    // create user and assoicate him with the roles
    const user: User = await this.userService.create({ roles, ...rest });
    await this.userRoleRepository.createMany(
      roles.map((role: Role) => ({
        roleId: role.id,
        userId: user.id,
      })),
    );
    return;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayloadDTO = this.extractJwtUserPayload(user);
    return this.jwtService.sign(payload, { expiresIn: '300s' });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const initPayload: JwtPayloadDTO = this.extractJwtUserPayload(user);

    const payload: JwtPayloadDTO = {
      ...initPayload,
      isRefresh: true,
      data: v4(),
    };

    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  private extractJwtUserPayload(user: User): JwtPayloadDTO {
    return {
      userId: user.id,
      roles: user.roles,
    };
  }
}
