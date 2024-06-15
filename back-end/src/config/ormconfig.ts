import * as dotenv from 'dotenv';
import { cwd, env } from 'process';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [`${cwd()}/src/modules/**/entities/**/*.entity.ts`],
  migrations: [`${cwd()}/src/modules/database/migrations/*.ts`],
  migrationsTableName: 'migrations',
  synchronize: false,
  dropSchema: false,
  logging: true
});
