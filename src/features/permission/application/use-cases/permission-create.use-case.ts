import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPermissionRepository, Permission } from '../../domain';
import { CreatePermissionDto } from '../dto';
import { ResponsePermissionDto } from '../dto/response-permission.dto';
import PermissionMapper from '../../infrastructure/permission.mapper';

@Injectable()
export class PermissionCreateUseCase {
  constructor(
    @Inject('IPermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<ResponsePermissionDto> {
    const { name, description } = createPermissionDto;

    const permissionCreated =
      await this.permissionRepository.findOneByName(name);

    if (permissionCreated)
      throw new BadRequestException(
        `Permission with Name "${name}" already exists.`,
      );

    const permission = Permission.create(name, description);

    const newPermission = await this.permissionRepository.create(permission);

    return PermissionMapper.toDto(newPermission);
  }
}
