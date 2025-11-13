export type DatabaseType = 'postgres' | 'sqlite';

export interface IDataBaseConfig {
  type: DatabaseType;
  url: string;
}

export interface IUserPasswordConfig {
  password_rounds: number;
  password_pepper: string;
}

export interface IAuthConfig {
  expiresIn: number;
  access_token_secret: string;
  refresh_token_secret: string;
}

export interface IAppConfigData {
  env: string;
  port: number;
  database: IDataBaseConfig;
  auth: IAuthConfig;
  userPassword: IUserPasswordConfig;
}
