import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { readdirSync, statSync } from 'fs';

export class PostgresDatabase {
  constructor(private readonly configService: ConfigService) {}

  private static loadEntitiesFromDirectory(directoryPath: string): any[] {
    let entities: any[] = [];

    try {
      const files = readdirSync(directoryPath);
      files.forEach((file) => {
        const fullPath = join(directoryPath, file);
        const fileStat = statSync(fullPath);

        if (fileStat.isDirectory()) {
          entities = [...entities, ...this.loadEntitiesFromDirectory(fullPath)];
        } else if (
          file.endsWith('.typeorm.entity.ts') ||
          file.endsWith('.typeorm.entity.js')
        ) {
          entities.push(require(fullPath).default);
        }
      });
    } catch (error) {
      console.error(`Error reading directory ${directoryPath}: `, error);
    }

    return entities;
  }

  private static loadEntities(): any[] {
    const rootPath = join(__dirname, '../../');
    const entities: any[] = [];
    const traverseDir = (dir: string) => {
      const files = readdirSync(dir);

      files.forEach((file) => {
        const fullPath = join(dir, file);
        const fileStat = statSync(fullPath);

        if (fileStat.isDirectory()) {
          if (file.toLowerCase() === 'entities') {
            const entityFiles = this.loadEntitiesFromDirectory(fullPath);
            entities.push(...entityFiles);
          } else {
            traverseDir(fullPath); // If it's not an entities folder, continue recursion
          }
        }
      });
    };
    traverseDir(rootPath);
    console.log('Loaded Entities: ', entities);
    return entities;
  }

  getConnection(): TypeOrmModuleOptions {
    const entities = PostgresDatabase.loadEntities();
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USERNAME', 'user'),
      password: this.configService.get<string>('DB_PASSWORD', 'password'),
      database: this.configService.get<string>('DB_NAME', 'my_database'),
      entities,
      synchronize: false, // в PROD среде всегда false
      autoLoadEntities: true,
      logging: false,
      dropSchema: false,
    };
  }
}
