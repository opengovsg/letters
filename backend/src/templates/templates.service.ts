import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  CreateTemplateDto,
  UpdateTemplateDto,
} from '~shared/dtos/templates.dto'

import { Template } from '../database/entities'
import { TemplatesParsingService } from './templates-parsing.service'
import { TemplatesSanitizationService } from './templates-sanitization.service'

@Injectable()
export class TemplatesService {
  constructor(
    private readonly templateSanitizationService: TemplatesSanitizationService,
    private readonly templatesParsingService: TemplatesParsingService,
  ) {}

  @InjectRepository(Template)
  private repository: Repository<Template>
  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const sanitizedTemplate =
      this.templateSanitizationService.sanitizeTemplate(createTemplateDto)
    const template = this.repository.create(sanitizedTemplate)
    return await this.repository.save(template)
  }

  async findAll() {
    return await this.repository.find({
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Template | null> {
    return await this.repository.findOne({ where: { id } })
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`
  }

  remove(id: number) {
    return `This action removes a #${id} template`
  }
}
