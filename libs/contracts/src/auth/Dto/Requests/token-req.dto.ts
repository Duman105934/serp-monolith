import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ITokenReq } from '@app/contracts/auth/interfaces/token-req.interface';

export class TokenReqDto implements ITokenReq {
  @Expose()
  @IsString()
  token: string;
}
