import { Injectable } from '@nestjs/common';
import type {
  ConfigDatabase,
  IConfigData,
} from '@app/configs/config.interface';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class ConfigService {
  private config: IConfigData;

  constructor(data?: IConfigData) {
    this.config = data ?? this.parseConfigFromEnv(process.env);
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  public get(): Readonly<IConfigData> {
    return this.config;
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): IConfigData {
    return {
      env: env['NODE_ENV'] ?? 'production',
      port: parseInt(env['PORT']!, 10) ?? 3001,
      db: this.parseDBConfig(env, { url: '' }),
      auth: {
        expiresIn: Number(env['TOKEN_EXPIRY'] ?? 30000),
        access_token_secret: env['JWT_ACCESS_TOKEN_SECRET']! ?? '',
        refresh_token_secret: env['JWT_REFRESH_TOKEN_SECRET']! ?? '',
      },
      userPassword: {
        password_rounds: Number(env['PASSWORD_ROUNDS']! ?? 10),
        password_pepper: env['PASSWORD_PEPPER']! ?? '',
      },
      tokenService: {
        transport: Transport.TCP,
        options: {
          host: env['TOKEN_SERVICE_HOST']! ?? '127.0.0.1',
          port: Number(env['TOKEN_SERVICE_PORT']! ?? 3000),
        },
      },
      userService: {
        options: {
          host: env['USER_SERVICE_HOST']! ?? '127.0.0.1',
          port: Number(env['USER_SERVICE_PORT']! ?? 3000),
        },
        transport: Transport.TCP,
      },
    };
  }

  private parseDBConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<ConfigDatabase>,
  ) {
    return {
      url: env['DATABASE_URL'] || defaultConfig.url,
    };
  }
}
