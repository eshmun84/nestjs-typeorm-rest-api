import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from '../../database';
import { PermissionController, PermissionRepository } from './infrastructure';
import {
  PermissionCreateUseCase,
  PermissionFindAllUseCase,
  PermissionFindOneUseCase,
  PermissionRemoveUseCase,
  PermissionRestoreUseCase,
  PermissionUpdateUseCase,
} from './application/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionController],
  providers: [
    PermissionCreateUseCase,
    PermissionFindAllUseCase,
    PermissionFindOneUseCase,
    PermissionRemoveUseCase,
    PermissionRestoreUseCase,
    PermissionUpdateUseCase,
    {
      provide: 'IPermissionRepository',
      useClass: PermissionRepository,
    },
  ],
})
export class PermissionModule {}
