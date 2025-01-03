import { Permission } from './entities';

export interface IPermissionRepository {
  create(_permission: Permission): Promise<Permission>;
  findAll(): Promise<Permission[] | null>;
  findOneById(_id: number, _withDeleted: boolean): Promise<Permission | null>;
  findOneByName(_name: string): Promise<Permission | null>;
  update(_permission: Permission): Promise<Permission>;
  remove(_id: number): Promise<void>;
  restore(_id: number): Promise<void>;
}
