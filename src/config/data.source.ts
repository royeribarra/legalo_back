import { ConfigModule } from "@nestjs/config";
import { DataSource, DataSourceOptions  } from "typeorm";
import { ConfigService } from '@nestjs/config/dist';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from "../database/seeds/Main.seeder";

ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`});
const configService = new ConfigService();
const isProd = process.env.NODE_ENV === 'production';

export const DataSourceConfig: DataSourceOptions & SeederOptions= {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  // entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  entities: [
    isProd
      ? 'dist/**/*.entity.js'
      : 'src1/**/*.entity.ts',
  ],
  // migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  migrations: [
    isProd
      ? 'dist/migrations/*.js'
      : 'src1/migrations/*.ts',
  ],
  synchronize: false,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  seeds: [MainSeeder],
}

export const AppDS= new DataSource(DataSourceConfig);