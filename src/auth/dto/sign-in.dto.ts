import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 150)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
