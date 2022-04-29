export class AccessTokenDTO {
  accessToken: string;
}

export class AuthTokensDTO extends AccessTokenDTO {
  refreshToken: string;
}
