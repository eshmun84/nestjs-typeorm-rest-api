import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigurationModule } from "./configuration";
import { DatabaseModule } from "./database";
import { PermissionModule } from "./features";
import { APP_FILTER } from "@nestjs/core";
import { DatabaseExceptionFilter, HttpExceptionFilter } from "./shared";

@Module({
  imports: [ConfigurationModule, DatabaseModule, PermissionModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter
    }
  ]
})
export class AppModule {
}
