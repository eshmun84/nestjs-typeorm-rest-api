import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PermissionMapper from './permission.mapper';
import { IPermissionRepository, Permission } from '../domain';
import { PermissionEntity } from '../../../database';

export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  async create(_permission: Permission): Promise<Permission> {
    const permissionEntity = this.repository.create(_permission);
    const permission = await this.repository.save(permissionEntity);
    return PermissionMapper.toDomain(permission);
  }

  async findAll(): Promise<Permission[] | null> {
    const permissions = await this.repository.find();
    if (!permissions) return null;
    return permissions.map(PermissionMapper.toDomain);
  }

  async findOneById(
    _id: number,
    _withDeleted: boolean = false,
  ): Promise<Permission | null> {
    const permission = await this.repository.findOne({
      where: { id: _id },
      withDeleted: _withDeleted,
    });
    if (!permission) return null;
    return PermissionMapper.toDomain(permission);
  }

  async findOneByName(_name: string): Promise<Permission | null> {
    const permission = await this.repository.findOneBy({ name: _name });
    if (!permission) return null;
    return PermissionMapper.toDomain(permission);
  }

  async update(_permission: Permission): Promise<Permission | null> {
    const permissionEntity = PermissionMapper.toEntity(_permission);
    const permission = await this.repository.save(permissionEntity);
    return PermissionMapper.toDomain(permission);
  }

  async restore(_id: number): Promise<void> {
    await this.repository.restore(_id);
  }

  async remove(_id: number): Promise<void> {
    await this.repository.softDelete(_id);
  }
}
