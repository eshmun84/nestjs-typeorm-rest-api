import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        retryDelay: 3000,
        autoLoadEntities: true,
        synchronize: false,
        migrations: ['dist/database/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
