import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPermissionRepository } from '../../domain';

@Injectable()
export class PermissionRemoveUseCase {
  constructor(
    @Inject('IPermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  async remove(id: number): Promise<void> {
    const permission = await this.permissionRepository.findOneById(id, false);

    if (!permission)
      throw new NotFoundException(`Permission with ID "${id}" not found.`);

    await this.permissionRepository.remove(id);
  }
}
