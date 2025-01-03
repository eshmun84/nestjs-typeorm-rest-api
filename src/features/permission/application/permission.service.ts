import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermissionDto, UpdatePermissionDto } from "./dto";
import { Permission } from "./entities";
import { IPermissionRepository } from "./ipermission.repository";
import { ResponsePermissionDto } from "./dto/response-permission.dto";
import PermissionMapper from "./permission.mapper";
import { ResponsePermissionStatusDto } from "./dto/response-permission-status.dto";

@Injectable()
export class PermissionService {
  constructor(
    @Inject('IPermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<ResponsePermissionDto> {
    const {name, description} = createPermissionDto;

    // const permissionCreated = await this.permissionRepository.findOneByName(name);
    //
    // if (permissionCreated) throw new BadRequestException(`Permission with Name "${name}" already exists.`);

    const permission = Permission.create(name, description);

    const newPermission = await this.permissionRepository.create(permission);

    return PermissionMapper.toDto(newPermission);
  }

  async findAll(): Promise<ResponsePermissionDto[]> {
    const permissions = await this.permissionRepository.findAll();

    if (!permissions) throw new NotFoundException(`No Permissions founded`);

    return permissions.map(PermissionMapper.toDto);
  }

  async findOne(id: number): Promise<ResponsePermissionDto> {
    const permission = await this.permissionRepository.findOneById(id, false);

    if (!permission) throw new NotFoundException(`Permission with ID "${id}" not found`);

    return PermissionMapper.toDto(permission);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<ResponsePermissionDto> {
    const {name, description} = updatePermissionDto;

    const permission = await this.permissionRepository.findOneById(id, false);

    if (!permission) throw new NotFoundException(`Permission with ID "${id}" not found.`);

    permission.name = name;
    permission.description = description;

    const permissionUpdated =  await this.permissionRepository.update(permission);

    return PermissionMapper.toDto(permissionUpdated);
  }

  async remove(id: number): Promise<void> {
    const permission = await this.permissionRepository.findOneById(id, false);

    if (!permission) throw new NotFoundException(`Permission with ID "${id}" not found.`);

    await this.permissionRepository.remove(id);

    // const permissionUpdated = await this.permissionRepository.findOneById(id, true);
    //
    // return {flag: permissionUpdated ? 'REMOVED' : 'ERROR'};
  }

  async restore(id: number): Promise<void> {
    const permission = await this.permissionRepository.findOneById(id, true);

    if (!permission) throw new NotFoundException(`Permission with ID "${id}" not found.`);

    await this.permissionRepository.restore(id);

    // const permissionRestored = await this.permissionRepository.findOneById(id, true);
    //
    // return {flag: permissionRestored ? 'REMOVED' : 'ERROR'};
  }
}
