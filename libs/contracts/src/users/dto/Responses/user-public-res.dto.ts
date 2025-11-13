import { IUserPublicRes } from '@app/contracts/users';

export class UserPublicResDto implements IUserPublicRes {
  id: string;
  email: string;
  is_confirmed: boolean;
}
