import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Template } from 'database/entities'
import { Repository } from 'typeorm'

import { CreateTemplateDto } from '~shared/dtos/create-template.dto'
import { UpdateTemplateDto } from '~shared/dtos/update-template.dto'

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: Repository<Template>,
  ) {}

  create(createTemplateDto: CreateTemplateDto) {
    return 'This action adds a new template'
  }

  async findAll() {
    return await this.repository.find({
      order: { createdAt: 'DESC' },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} template`
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`
  }

  remove(id: number) {
    return `This action removes a #${id} template`
  }
}
