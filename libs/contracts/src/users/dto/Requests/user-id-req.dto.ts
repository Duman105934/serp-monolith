import { IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { IUserIdReq } from '@app/contracts/users/interfaces/Requests/user-email-req.interface';

export class UserIdReqDto implements IUserIdReq {
  @Expose()
  @IsUUID()
  id!: string;
}
