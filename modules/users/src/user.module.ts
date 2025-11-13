import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppConfigModule, DatabaseModule } from '@app/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    DatabaseModule.forRoot({
      entities: [UserEntity],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AppConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
