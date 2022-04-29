import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsArray,
  ArrayNotEmpty,
} from 'class-validatorp';

export class SignUpDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  roles: string[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
