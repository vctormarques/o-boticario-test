import { resolve } from 'path';

const SOURCE_PATH = resolve(__dirname, '..', '.');

export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  environment: process.env.API_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'root',
  },
  orm: {
    synchronize: false,
    migrationsRun: true,
    entities: [
      `${SOURCE_PATH}/**/*.entity.{js,ts}`,
      'dist/modules/**/entities/**/*.entity.{js,ts}',
    ],
    migrations: ['dist/modules/database/migrations/*.js'],
  },
  logger: {
    level: process.env.API_ENV !== 'production' ? 'trace' : 'info',
    transport:
      process.env.API_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              levelFirst: true,
              translateTime: 'UTC:dd/mm/yyyy h:MM:ss TT Z',
            },
          }
        : undefined,
  },
});
