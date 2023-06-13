import { BadRequestException, Injectable } from '@nestjs/common'

import { CreateTemplateDto } from '~shared/dtos/templates.dto'
import { sanitizeHtml } from '~shared/util/html-sanitizer'
import {
  convertFieldsToLowerCase,
  deduplicateFields,
  isFieldsInvalid,
  isHtmlKeywordsInvalid,
  setHtmlKeywordsToLowerCase,
} from '~shared/util/templates'

@Injectable()
export class TemplatesParsingService {
  processTemplate(createTemplateDto: CreateTemplateDto) {
    const sanitizedHtml = sanitizeHtml(createTemplateDto.html)
    createTemplateDto.html = setHtmlKeywordsToLowerCase(sanitizedHtml)
    createTemplateDto.fields = deduplicateFields(
      convertFieldsToLowerCase(createTemplateDto.fields),
    )

    const invalidHtml = isHtmlKeywordsInvalid(createTemplateDto.html)
    if (invalidHtml)
      throw new BadRequestException(
        `Invalid html fields: ${invalidHtml.join(', ')}`,
      )

    const invalidFields = isFieldsInvalid(createTemplateDto.fields)
    if (invalidFields)
      throw new BadRequestException(
        `Invalid fields: ${invalidFields.join(', ')}`,
      )

    return createTemplateDto
  }
}
