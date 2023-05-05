import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'

import { CreateTemplateDto } from '~shared/dtos/create-template.dto'
import { UpdateTemplateDto } from '~shared/dtos/update-template.dto'

import { mapTemplateToDto } from '../core/dto-mappers/template.dto-mapper'
import { TemplatesService } from './templates.service'

@Controller()
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  async create(@Body() templateDto: CreateTemplateDto) {
    return await this.templatesService
      .create(templateDto)
      .then((c) => mapTemplateToDto(c))
  }

  @Get()
  findAll() {
    return this.templatesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const template = await this.templatesService.findOne(+id)
    if (!template) throw new NotFoundException('Template not found')
    return mapTemplateToDto(template)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templatesService.update(+id, updateTemplateDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templatesService.remove(+id)
  }
}
