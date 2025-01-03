import { PermissionEntity } from "../../database";
import { Permission } from "./entities";
import { ResponsePermissionDto } from "./dto/response-permission.dto";

export default class PermissionMapper {
  public static toDomain(entity: PermissionEntity): Permission {
    return new Permission(
      entity.id,
      entity.name,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  public static toEntity(permission: Permission): PermissionEntity {
    const entity = new PermissionEntity();
    entity.id = permission.id || null;
    entity.name = permission.name;
    entity.description = permission.description || null;
    entity.createdAt = permission.createdAt || undefined;
    entity.updatedAt = permission.updatedAt || undefined;
    entity.deletedAt = permission.deletedAt || undefined;
    return entity;
  }

  public static toDto(permission: Permission): ResponsePermissionDto{
    return {
      id: permission.id,
      name: permission.name,
      description: permission.description,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
      deletedAt: permission.deletedAt,
    }
  }
}
