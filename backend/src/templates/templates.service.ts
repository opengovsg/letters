import { Injectable } from '@nestjs/common'

import { CreateTemplateDto } from '../../../shared/src/dtos/create-template.dto'
import { UpdateTemplateDto } from '../../../shared/src/dtos/update-template.dto'

@Injectable()
export class TemplatesService {
  create(createTemplateDto: CreateTemplateDto) {
    return 'This action adds a new template'
  }

  findAll() {
    return `This action returns all templates`
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
