import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
  AppConfigModule,
  AppConfigService,
  DatabaseModule,
} from '@app/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenEntity } from './auth-token.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule.forRoot({
      entities: [AuthTokenEntity],
    }),
    TypeOrmModule.forFeature([AuthTokenEntity]),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => {
        return {
          secret: configService.get().auth.access_token_secret,
        };
      },
      inject: [AppConfigService],
    }),
    AppConfigModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
