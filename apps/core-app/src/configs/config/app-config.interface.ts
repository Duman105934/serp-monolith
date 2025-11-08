export type databaseType = 'postgres' | 'sqlite';

export interface DataBaseConfig {
  type: databaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
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

export interface IAppConfigData {
  env: string;
  port: number;
  database: DataBaseConfig;
  auth: AuthConfig;
  userPassword: UserPasswordConfig;
}
