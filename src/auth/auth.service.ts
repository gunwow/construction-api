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

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn({ email, password }: SignInDTO): Promise<AuthTokensDTO> {
    const user: User = await this.userService.repository.findByEmail(email);

    if (!user || !(await this.hashService.compare(password, user.password))) {
      throw new UnauthorizedException(`Credentials don't match.`);
    }

    return this.generateAuthTokens(user);
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

  async signUp(payload: SignUpDTO): Promise<AuthTokensDTO> {
    const existingUser: User = await this.userService.repository.findByEmail(
      payload.email,
    );
    if (existingUser) {
      throw new ConflictException(`User with that email already exists`);
    }

    const user: User = await this.userService.create(payload);

    return this.generateAuthTokens(user);
  }

  async generateAuthTokens(user: User): Promise<AuthTokensDTO> {
    const accessToken: string = await this.generateAccessToken(user);
    const refreshToken: string = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
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
      role: user.role,
    };
  }
}
