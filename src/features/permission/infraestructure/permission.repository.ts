import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IPermissionRepository } from "./ipermission.repository";
import { PermissionEntity } from "../../database";
import { Permission } from "./entities";
import PermissionMapper from "./permission.mapper";

export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  async create(permission: Permission): Promise<Permission> {
    const permissionPersistance = this.repository.create(permission);
    const permissionCreated = await this.repository.save(permissionPersistance);
    return PermissionMapper.toDomain(permissionCreated);
  }

  async findAll(): Promise<Permission[] | null> {
    const permissions = await this.repository.find();
    if (!permissions) return null;
    return permissions.map(PermissionMapper.toDomain);
  }

  async findOneById(id: number, withDeleted: boolean = false): Promise<Permission | null> {
    const permission = await this.repository.findOne({ where: { id: id }, withDeleted: withDeleted});
    if (!permission) return null;
    return PermissionMapper.toDomain(permission);
  }

  async findOneByName(name: string): Promise<Permission | null> {
    const permission = await this.repository.findOneBy({ name: name });
    if (!permission) return null;
    return PermissionMapper.toDomain(permission);
  }

  async update(permission: Permission): Promise<Permission | null> {
    const permissionPersistence = PermissionMapper.toEntity(permission);
    const permissionUpdated = await this.repository.save(permissionPersistence);
    return PermissionMapper.toDomain(permissionUpdated);
  }

  async restore(id: number): Promise<boolean> {
    const result = await this.repository.restore(id);

    return result.affected > 0;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repository.softDelete(id);

    return result.affected > 0;
  }
}
