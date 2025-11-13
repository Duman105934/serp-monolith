import { IAuthTokenRes } from '@app/contracts/auth/interfaces/auth-token-res.interface';

export class AuthTokenResDto implements IAuthTokenRes {
  user_id: string;
  token?: string;
}
