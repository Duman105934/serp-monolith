import { IUserPublicRes } from '@app/contracts/index';
import { UserEntity } from '../../../../../modules/users/src/user.entity';

export function userCreateResToPublicMapper(
  entity: UserEntity,
): IUserPublicRes {
  return {
    id: entity.id,
    email: entity.email,
    is_confirmed: entity.is_confirmed,
  };
}
