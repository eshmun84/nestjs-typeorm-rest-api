import { DataSource } from 'typeorm';
import { envConfiguration } from "../configuration";

export const config = envConfiguration();

export const AppDataSource = new DataSource({
  type: 'mysql' as const,
  host: config.databaseHost,
  port: config.databasePort,
  username: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseName,
  entities: ['src/**/*.entity{.js,.ts}'],
  migrations: ['src/database/migrations/*{.js,.ts}'],
  migrationsTableName: 'migrations',
});