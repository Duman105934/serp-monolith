// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { UserEntity } from './user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { hash } from 'bcrypt';
//
// @Injectable()
// export class UserService {
//   private readonly passwordRounds: number;
//   private readonly passwordPepper: string;
//
//   constructor(
//     @InjectRepository(UserEntity)
//     private userRepository: Repository<UserEntity>,
//     private readonly configService: ConfigService,
//   ) {
//     const configServiceGet = this.configService.get();
//     this.passwordRounds = configServiceGet.userPassword?.password_rounds;
//     this.passwordPepper = configServiceGet.userPassword?.password_pepper;
//   }
//
//   // Create
//   public async createUser(dto: CreateUserDto): Promise<UserEntity> {
//     const passwordHash = await hash(
//       dto.password + this.passwordPepper,
//       this.passwordRounds,
//     );
//     const userEntity = this.userRepository.create({
//       email: dto.email,
//       password: passwordHash,
//       is_confirmed: false,
//     });
//     return await this.userRepository.save(userEntity);
//   }
//
//   // Search by
//   public async searchUserByEmail(params: {
//     email: string;
//   }): Promise<UserEntity | null> {
//     const email = params.email;
//     return await this.userRepository.findOne({ where: { email } });
//   }
// }
