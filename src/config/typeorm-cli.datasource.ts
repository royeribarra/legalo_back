// typeorm-cli.datasource.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { createDataSourceConfig } from './typeorm.datasource';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

export default new DataSource(
  createDataSourceConfig(
    new ConfigService(),
    process.env.NODE_ENV === 'production',
  ),
);
