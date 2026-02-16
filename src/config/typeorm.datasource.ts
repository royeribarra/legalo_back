import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';

export const createDataSourceConfig = (
  configService: ConfigService,
  isCompiled = false,
): DataSourceOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get<number>('DB_PORT')),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  entities: [
    isCompiled ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts',
  ],
  migrations: [
    isCompiled ? 'dist/migrations/*.js' : 'src/migrations/*.ts',
  ],
  // migrations: [],
  synchronize: false,
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
});
