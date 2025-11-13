import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface IDatabaseModuleOptions {
  entities: NonNullable<TypeOrmModuleOptions['entities']>;
  synchronize?: boolean;
  logging?: boolean;
}
