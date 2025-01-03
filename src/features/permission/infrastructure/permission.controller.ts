import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreatePermissionDto,
  PermissionCreateUseCase,
  PermissionFindAllUseCase,
  PermissionFindOneUseCase,
  PermissionRemoveUseCase,
  PermissionRestoreUseCase,
  PermissionUpdateUseCase,
  UpdatePermissionDto,
} from '../application';
import { ResponsePermissionDto } from '../application/dto/response-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionCreateUseCase: PermissionCreateUseCase,
    private readonly permissionFindAllUseCase: PermissionFindAllUseCase,
    private readonly permissionFindOneUseCase: PermissionFindOneUseCase,
    private readonly permissionRemoveUseCase: PermissionRemoveUseCase,
    private readonly permissionRestoreUseCase: PermissionRestoreUseCase,
    private readonly permissionUpdateUseCase: PermissionUpdateUseCase,
  ) {}

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<ResponsePermissionDto> {
    return this.permissionCreateUseCase.create(createPermissionDto);
  }

  @Get()
  async findAll(): Promise<ResponsePermissionDto[]> {
    return this.permissionFindAllUseCase.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponsePermissionDto> {
    return this.permissionFindOneUseCase.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<ResponsePermissionDto> {
    return this.permissionUpdateUseCase.update(id, updatePermissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.permissionRemoveUseCase.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: number): Promise<void> {
    return this.permissionRestoreUseCase.restore(id);
  }
}
