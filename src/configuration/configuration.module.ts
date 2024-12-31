import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './env.configuration';
import { envValidation } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfiguration],
      validate: envValidation,
    }),
  ],
})
export class ConfigurationModule {}
