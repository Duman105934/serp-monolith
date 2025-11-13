import { IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { IUserEmailReq } from '@app/contracts/users/interfaces/Requests/user-id-req.interface';

export class UserEmailReqDto implements IUserEmailReq {
  @Expose()
  @IsEmail()
  email!: string;
}
