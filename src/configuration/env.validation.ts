import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  ENVIRONMENT: string;

  @IsString()
  @IsNotEmpty()
  APP_VERSION: string;

  @IsString()
  @IsNotEmpty()
  APP_NAME: string;

  @IsNumber()
  @IsNotEmpty()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  UPLOAD_LOCATION: string;

  @IsString()
  @IsNotEmpty()
  PUBLIC_LOCATION: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_TYPE: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET_KEY: string;

  @IsNumber()
  @IsNotEmpty()
  JWT_EXPIRATION: number;
}

export function envValidation(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
