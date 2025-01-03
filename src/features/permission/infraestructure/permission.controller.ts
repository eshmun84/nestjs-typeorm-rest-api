import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, UpdatePermissionDto } from "./dto";
import { Permission } from "./entities";
import { ResponsePermissionDto } from "./dto/response-permission.dto";
import { ResponsePermissionStatusDto } from "./dto/response-permission-status.dto";

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<ResponsePermissionDto> {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  async findAll(): Promise<ResponsePermissionDto[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponsePermissionDto> {
    return this.permissionService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePermissionDto: UpdatePermissionDto): Promise<ResponsePermissionDto> {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.permissionService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: number): Promise<void> {
    return this.permissionService.restore(id);
  }
}
