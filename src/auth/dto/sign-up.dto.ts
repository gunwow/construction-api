import { IsNotEmpty, IsString, IsEmail, Length, IsIn } from 'class-validator';
import { Role } from '../../user/type/role.enum';

export class SignUpDTO {
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

  @IsNotEmpty()
  @IsIn([Role.BARBER, Role.CUSTOMER])
  role: Role;
}
