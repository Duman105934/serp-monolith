import { ServiceClientOptions } from './service-client-options.type';

export interface ConfigDatabase {
  url: string;
}

export interface UserPasswordConfig {
  password_rounds: number;
  password_pepper: string;
}

export interface AuthConfig {
  expiresIn: number;
  access_token_secret: string;
  refresh_token_secret: string;
}

export interface IConfigData {
  env: string;
  port: number;
  db: ConfigDatabase;
  auth: AuthConfig;
  userPassword: UserPasswordConfig;
  userService?: ServiceClientOptions;
  tokenService?: ServiceClientOptions;
}
