import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPermissionRepository } from '../../domain';
import PermissionMapper from '../../infrastructure/permission.mapper';
import { ResponsePermissionDto } from '../dto/response-permission.dto';

@Injectable()
export class PermissionFindOneUseCase {
  constructor(
    @Inject('IPermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  async findOne(id: number): Promise<ResponsePermissionDto> {
    const permission = await this.permissionRepository.findOneById(id, false);

    if (!permission)
      throw new NotFoundException(`Permission with ID "${id}" not found`);

    return PermissionMapper.toDto(permission);
  }
}
