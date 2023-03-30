import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  AddPermissionDto,
  AddPermissionResponseDto,
  CreateTemplateDto,
  CreateTemplateResponseDto,
  DeletePermissionDto,
  DeletePermissionResponseDto,
  GetTemplateResponseDto,
  ListPermissionsDto,
  ListPermissionsResponseDto,
  UpdateTemplateDto,
  UpdateTemplateResponseDto,
} from './dto'

import { PermissionsService } from './permissions.service'
import { TemplatesService } from './templates.service'
import { AuthGuard } from 'auth/auth.guard'
import { SessionData } from 'express-session'

@Controller('templates')
@ApiTags('templates')
@UseGuards(AuthGuard)
export class TemplatesController {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  /**
   * Create a new template
   */
  @Post()
  @ApiCreatedResponse({ type: CreateTemplateResponseDto })
  async createTemplate(
    @Session() session: SessionData,
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<CreateTemplateResponseDto> {
    const result = await this.templatesService.createTemplate(
      session.user,
      createTemplateDto,
    )
    return result
  }

  /**
   * Get the latest version of a template by id
   */
  @Get(':id')
  async getTemplate(
    @Session() session: SessionData,
    @Param('id') templateId: number,
  ): Promise<GetTemplateResponseDto> {
    const result = await this.templatesService.getTemplate(
      session.user,
      templateId,
    )
    return result
  }

  /**
   * Create a new version of a template by id
   */
  @Put(':id')
  @ApiResponse({ type: UpdateTemplateResponseDto })
  async updateTemplate(
    @Session() session: SessionData,
    @Param('id') templateId: number,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ): Promise<UpdateTemplateResponseDto> {
    const result = await this.templatesService.updateTemplate(session.user, {
      ...updateTemplateDto,
      templateId,
    })
    return result
  }

  /**
   * Hide all versions of a template by id such that the template is no longer displayed
   * and cannot be used for issuance
   */
  @Post(':id/hide')
  async hideTemplate(@Param('id') templateId: number): Promise<void> {
    await this.templatesService.hideTemplate(templateId)
  }

  /**
   * Add permission to template
   */
  @Post(':id/permissions')
  @ApiResponse({ type: AddPermissionResponseDto })
  async addPermission(
    @Param('id') _templateId: number,
    @Body() _addPermissionDto: AddPermissionDto,
  ): Promise<void> {
    await this.permissionsService.addPermission()
  }

  /**
   * List permissions for template
   */
  @Get(':id/permissions')
  @ApiResponse({ type: ListPermissionsResponseDto })
  async listPermission(
    @Param('id') _templateId: number,
    @Body() _listPermissionsDto: ListPermissionsDto,
  ): Promise<void> {
    await this.permissionsService.listPermissions()
  }

  /**
   * Delete permission from template
   */
  @Post(':id/permissions/delete')
  @ApiResponse({ type: DeletePermissionResponseDto })
  async deletePermission(
    @Param('id') _templateId: number,
    @Body() _deletePermissionDto: DeletePermissionDto,
  ): Promise<void> {
    await this.permissionsService.deletePermission()
  }
}
