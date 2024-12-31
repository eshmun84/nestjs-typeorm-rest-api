import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from "./configuration";
import { DatabaseModule } from "./database";

@Module({
  imports: [ConfigurationModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
