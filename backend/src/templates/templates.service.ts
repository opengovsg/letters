import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateTemplateDto } from '~shared/dtos/create-template.dto'
import { UpdateTemplateDto } from '~shared/dtos/update-template.dto'

import { Template } from '../database/entities'

@Injectable()
export class TemplatesService {
  @InjectRepository(Template)
  private repository: Repository<Template>
  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const template = this.repository.create(createTemplateDto)
    return await this.repository.save(template)
  }

  findAll() {
    return `This action returns all templates`
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } })
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`
  }

  remove(id: number) {
    return `This action removes a #${id} template`
  }
}
