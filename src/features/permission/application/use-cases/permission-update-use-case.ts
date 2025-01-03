import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPermissionRepository } from '../../domain';
import PermissionMapper from '../../infrastructure/permission.mapper';
import { UpdatePermissionDto } from '../dto';
import { ResponsePermissionDto } from '../dto/response-permission.dto';

@Injectable()
export class PermissionUpdateUseCase {
  constructor(
    @Inject('IPermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<ResponsePermissionDto> {
    const { name, description } = updatePermissionDto;

    const permission = await this.permissionRepository.findOneById(id, false);

    if (!permission)
      throw new NotFoundException(`Permission with ID "${id}" not found.`);

    permission.name = name;
    permission.description = description;

    const permissionUpdated =
      await this.permissionRepository.update(permission);

    return PermissionMapper.toDto(permissionUpdated);
  }
}
