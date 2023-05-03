import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { CreateTemplateDto } from '../../../shared/src/dtos/create-template.dto'
import { UpdateTemplateDto } from '../../../shared/src/dtos/update-template.dto'
import { TemplatesService } from './templates.service'

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto)
  }

  @Get()
  findAll() {
    return this.templatesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(+id)
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
