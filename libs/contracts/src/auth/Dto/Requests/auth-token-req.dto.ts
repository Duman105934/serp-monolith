import { IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { IAuthTokenReq } from '@app/contracts/auth/interfaces/auth-token-req.interface';

export class AuthTokenReqDto implements IAuthTokenReq {
  @Expose()
  @IsUUID()
  userId: string;
}
