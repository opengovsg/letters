import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  CreateTemplateDto,
  UpdateTemplateDto,
} from '~shared/dtos/templates.dto'
import { sanitizeHtml } from '~shared/util/html-sanitizer'

import { Template } from '../database/entities'

@Injectable()
export class TemplatesService {
  @InjectRepository(Template)
  private repository: Repository<Template>
  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const sanitizedCreateTemplateDto = {
      ...createTemplateDto,
      html: sanitizeHtml(createTemplateDto.html),
    }
    const template = this.repository.create(sanitizedCreateTemplateDto)
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
