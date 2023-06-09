import { Injectable } from '@nestjs/common'

import { CreateTemplateDto } from '~shared/dtos/templates.dto'
import { sanitizeHtml } from '~shared/util/html-sanitizer'
import { normalizeFields, normalizeHtmlKeywords } from '~shared/util/templates'

@Injectable()
export class TemplatesParsingService {
  processTemplate(createTemplateDto: CreateTemplateDto) {
    const sanitizedHtml = sanitizeHtml(createTemplateDto.html)
    createTemplateDto.fields = normalizeFields(createTemplateDto.fields)
    createTemplateDto.html = normalizeHtmlKeywords(sanitizedHtml)

    return createTemplateDto
  }
}
