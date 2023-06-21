import { Injectable } from '@nestjs/common'
import { Template } from 'database/entities'

import { CreateTemplateDto } from '~shared/dtos/templates.dto'
import { getTemplateFields, parseTemplateField } from '~shared/util/templates'

@Injectable()
export class TemplatesParsingService {
  parseTemplate(createTemplateDto: CreateTemplateDto): Partial<Template> {
    const { html } = createTemplateDto
    return {
      ...createTemplateDto,
      fields: [],
      html,
    }
  }
}
