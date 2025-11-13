import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AuthGuard } from '@app/common';
import { AppConfigModule, DatabaseModule } from '@app/configs';
import { UserModule } from '../../../modules/users/src/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../../../modules/auth/auth.module';
import { HttpExceptionFilter } from '@app/common/exceptions/http-exception.filter';

@Module({
  imports: [DatabaseModule, AppConfigModule, UserModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CoreAppModule {}
