import { Injectable } from '@nestjs/common'
import { Template } from 'database/entities'

import { CreateTemplateDto } from '~shared/dtos/templates.dto'
import { getTemplateFields, parseTemplateField } from '~shared/util/templates'

@Injectable()
export class TemplatesParsingService {
  parseTemplate(createTemplateDto: CreateTemplateDto): Partial<Template> {
    const { html } = createTemplateDto
    const replacedHtml = html.replace(/&nbsp;/g, ' ')

    // extract valid fields
    const validFields: string[] = getTemplateFields(replacedHtml)

    // make fields lowercase, handle whitespace, deduplicate
    const parsedFields: string[] = []
    validFields.forEach((field: string) => {
      const parsedField = parseTemplateField(field)
      if (!parsedFields.includes(parsedField)) parsedFields.push(parsedField)
    })

    // for each valid field, replace field in html with the lowercased and trimmed version
    let parsedHtml: string = replacedHtml
    validFields.forEach((validField: string) => {
      parsedHtml = parsedHtml.replaceAll(
        `{{${validField}}}`,
        `{{${parseTemplateField(validField)}}}`,
      )
    })

    return {
      ...createTemplateDto,
      fields: parsedFields,
      html: parsedHtml,
    }
  }
}
