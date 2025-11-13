import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IUserCreateReq } from '@app/contracts/users';

export class UserCreateReqDto implements IUserCreateReq {
  @IsEmail()
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  email: string;

  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  password: string;
}
