import { UpdateResult } from 'typeorm';
import { Permission } from "./entities";

export interface IPermissionRepository {
  create(permission: Permission): Promise<Permission>;
  findAll(): Promise<Permission[] | null>;
  findOneById(id: number, withDeleted: boolean): Promise<Permission | null>;
  findOneByName(name: string): Promise<Permission | null>;
  update(permission: Permission): Promise<Permission>;
  remove(id: number): Promise<boolean>;
  restore(id: number): Promise<boolean>;
}
