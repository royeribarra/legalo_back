import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from '../database/seeds/Main.seeder.js';

const dataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/**.entity.js', 'src/**/**.entity.ts'],
  migrations: ['dist/migrations/*.js', 'migrations/*.ts'],
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  seeds: [MainSeeder],
} as const;

const AppDataSource = new DataSource(
  dataSourceOptions as any // 👈 TypeORM + SeederOptions bug conocido
);

export default AppDataSource;
