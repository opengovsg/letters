import { Injectable } from '@nestjs/common'

import { CreateTemplateDto } from '~shared/dtos/templates.dto'
import { sanitizeHtml } from '~shared/util/html-sanitizer'
import {
  convertFieldsToLowerCase,
  deduplicateFields,
  setHtmlKeywordsToLowerCase,
} from '~shared/util/templates'

@Injectable()
export class TemplatesParsingService {
  processTemplate(createTemplateDto: CreateTemplateDto) {
    const sanitizedHtml = sanitizeHtml(createTemplateDto.html)
    createTemplateDto.fields = deduplicateFields(
      convertFieldsToLowerCase(createTemplateDto.fields),
    )
    createTemplateDto.html = setHtmlKeywordsToLowerCase(sanitizedHtml)

    return createTemplateDto
  }
}
