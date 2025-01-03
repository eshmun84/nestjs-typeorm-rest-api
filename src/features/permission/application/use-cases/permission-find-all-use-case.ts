import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPermissionRepository } from '../../domain';
import { ResponsePermissionDto } from '../dto/response-permission.dto';
import PermissionMapper from '../../infrastructure/permission.mapper';

@Injectable()
export class PermissionFindAllUseCase {
  constructor(
    @Inject('IPermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  async findAll(): Promise<ResponsePermissionDto[]> {
    const permissions = await this.permissionRepository.findAll();

    if (!permissions) throw new NotFoundException(`No Permissions founded`);

    return permissions.map(PermissionMapper.toDto);
  }
}
