import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPermissionRepository } from '../../domain';

@Injectable()
export class PermissionRestoreUseCase {
  constructor(
    @Inject('IPermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  async restore(id: number): Promise<void> {
    const permission = await this.permissionRepository.findOneById(id, true);

    if (!permission)
      throw new NotFoundException(`Permission with ID "${id}" not found.`);

    await this.permissionRepository.restore(id);
  }
}
