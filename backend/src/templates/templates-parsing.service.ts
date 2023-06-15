import { BadRequestException, Injectable } from '@nestjs/common'

import { CreateTemplateDto } from '~shared/dtos/templates.dto'
import { sanitizeHtml } from '~shared/util/html-sanitizer'
import {
  convertFieldsToLowerCase,
  deduplicateFields,
  getHtmlFields,
  isFieldsInvalid,
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

    const invalidHtml = isFieldsInvalid(getHtmlFields(createTemplateDto.html))
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
