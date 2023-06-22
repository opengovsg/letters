import { Injectable } from '@nestjs/common'
import { Template } from 'database/entities'

import { CreateTemplateDto } from '~shared/dtos/templates.dto'
import { getTemplateFields, parseTemplateField } from '~shared/util/templates'

@Injectable()
export class TemplatesParsingService {
  parseTemplate(createTemplateDto: CreateTemplateDto): Partial<Template> {
    const { html } = createTemplateDto

    // extract valid keywords
    const validFields: string[] = getTemplateFields(html)

    // make fields lowercase, handle whitespace
    const parsedFields: string[] = validFields.map((field: string) =>
      parseTemplateField(field),
    )

    // for each valid field, replace the field in the html with the parsed version
    let parsedHtml = html
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
