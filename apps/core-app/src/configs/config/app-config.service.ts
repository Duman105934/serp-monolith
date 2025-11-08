import { Injectable } from '@nestjs/common';
import { IAppConfigData } from './app-config.interface';

@Injectable()
export class AppConfigService {
  private config: IAppConfigData;

  constructor() {}

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  public get(): Readonly<IAppConfigData> {
    return this.config;
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): IAppConfigData {
    return {
      env: env['NODE_ENV'] ?? 'production',
      port: Number(parseInt(env['PORT']!, 10) ?? 3001),
      database: {
        type: 'postgres',
        host: String(env['DB_HOST'] ?? 'localhost'),
        port: Number(env['DB_PORT'] ?? 5432),
        username: String(env['DB_USERNAME'] ?? 'user'),
        password: String(env['DB_PASSWORD'] ?? 'password'),
        database: String(env['DB_NAME'] ?? 'my_database'),
      },
      auth: {
        expiresIn: Number(env['TOKEN_EXPIRY'] ?? 30000),
        access_token_secret: String(env['JWT_ACCESS_TOKEN_SECRET']! ?? ''),
        refresh_token_secret: String(env['JWT_REFRESH_TOKEN_SECRET']! ?? ''),
      },
      userPassword: {
        password_rounds: Number(env['PASSWORD_ROUNDS']! ?? 10),
        password_pepper: String(env['PASSWORD_PEPPER']! ?? ''),
      },
    };
  }
}
