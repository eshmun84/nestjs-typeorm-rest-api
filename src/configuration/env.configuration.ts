import * as process from 'node:process';

export const envConfiguration = () => ({
  environment: process.env.ENVIRONMENT,
  appVersion: process.env.APP_VERSION,
  appName: process.env.APP_NAME,
  appPort: parseInt(process.env.APP_PORT),
  uploadLocation: process.env.UPLOAD_LOCATION,
  publicLocation: process.env.PUBLIC_LOCATION,

  databaseType: process.env.DB_TYPE,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: parseInt(process.env.DATABASE_PORT),
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName: process.env.DATABASE_NAME,

  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpires: process.env.JWT_EXPIRES,
});
