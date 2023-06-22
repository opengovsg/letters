import { Injectable } from '@nestjs/common'

import { CreateTemplateDto } from '~shared/dtos/templates.dto'
import { sanitizeHtml } from '~shared/util/html-sanitizer'

@Injectable()
export class TemplatesSanitizationService {
  sanitizeTemplate(createTemplateDto: CreateTemplateDto): CreateTemplateDto {
    return {
      ...createTemplateDto,
      html: sanitizeHtml(createTemplateDto.html),
    }
  }
}
