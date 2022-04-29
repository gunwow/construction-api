import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenDTO, AuthTokensDTO } from './dto/auth-tokens.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() payload: SignInDTO): Promise<AuthTokensDTO> {
    return this.authService.signIn(payload);
  }

  @Post('refresh')
  async refresh(@Body() payload: RefreshDTO): Promise<AccessTokenDTO> {
    return this.authService.refresh(payload);
  }
}
