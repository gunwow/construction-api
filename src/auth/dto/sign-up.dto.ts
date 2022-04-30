import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsArray,
  ArrayNotEmpty,
  IsUUID,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
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
