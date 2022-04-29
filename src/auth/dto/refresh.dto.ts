import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshDTO {
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
