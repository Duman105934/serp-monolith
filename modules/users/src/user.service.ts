import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { AppConfigService } from '@app/configs';
import { IUserCreateReq } from '@app/contracts';
import { userCreateResToPublicMapper } from '@app/contracts/users/mappers';
import { IUserPublicRes } from '@app/contracts/users/interfaces/Responses/user-public-res.interface';

@Injectable()
export class UserService {
  private readonly passwordRounds: number;
  private readonly passwordPepper: string;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly configService: AppConfigService,
  ) {
    const configServiceGet = this.configService.get();
    this.passwordRounds = configServiceGet.userPassword?.password_rounds;
    this.passwordPepper = configServiceGet.userPassword?.password_pepper;
  }

  // Create
  public async createUser(data: IUserCreateReq): Promise<IUserPublicRes> {
    const passwordHash = await hash(
      data.password + this.passwordPepper,
      this.passwordRounds,
    );
    const userEntity = this.userRepository.create({
      email: data.email,
      password: passwordHash,
      is_confirmed: false,
    });
    const user = await this.userRepository.save(userEntity);
    return userCreateResToPublicMapper(user);
  }

  // Search by
  public async searchUserByEmail(
    email: string,
  ): Promise<IUserPublicRes | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? userCreateResToPublicMapper(user) : null;
  }

  public async searchUserById(id: string): Promise<IUserPublicRes | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ? userCreateResToPublicMapper(user) : null;
  }
}
