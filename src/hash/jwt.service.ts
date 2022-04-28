import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  async sign(payload: any, options?: JwtSignOptions): Promise<string> {
    return this.nestJwtService.signAsync(payload, options);
  }

  async verify(token: string): Promise<any> {
    return this.nestJwtService.verifyAsync(token);
  }
}
