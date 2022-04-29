import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenDTO, AuthTokensDTO } from './dto/auth-tokens.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() payload: SignInDTO): Promise<AuthTokensDTO> {
    return this.authService.signIn(payload);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() payload: RefreshDTO): Promise<AccessTokenDTO> {
    return this.authService.refresh(payload);
  }

  @Post('sign-up')
  async signUp(@Body() payload: SignUpDTO): Promise<void> {
    return this.authService.signUp(payload);
  }
}
