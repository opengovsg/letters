import { CreateTemplateDto } from '~shared/dtos/templates.dto'

import { TemplatesParsingService } from './templates-parsing.service'

describe('TemplatesParsingService', () => {
  let templatesParsingService: TemplatesParsingService

  beforeEach(() => {
    templatesParsingService = new TemplatesParsingService()
  })

  const partialTemplate = {
    name: 'Test Template',
    thumbnailS3Path: 'TODO',
  }

  describe('parseTemplate', () => {
    it('should parse the template fields and return the parsed result', () => {
      const createTemplateDto: CreateTemplateDto = {
        ...partialTemplate,
        html: 'Hello {{name}}, your email is {{email}}. Today is {{date_today}}.',
      }

      const result = templatesParsingService.parseTemplate(createTemplateDto)

      expect(result).toEqual({
        ...createTemplateDto,
        fields: ['name', 'email', 'date_today'],
        html: 'Hello {{name}}, your email is {{email}}. Today is {{date_today}}.',
      })
    })

    it('should handle whitespace and lowercase fields', () => {
      const createTemplateDto: CreateTemplateDto = {
        ...partialTemplate,
        html: 'Hello {{  NAME   }}, your email is {{  EMaiL   }}.',
      }

      const result = templatesParsingService.parseTemplate(createTemplateDto)

      expect(result).toEqual({
        ...createTemplateDto,
        fields: ['name', 'email'],
        html: 'Hello {{name}}, your email is {{email}}.',
      })
    })

    it('should deduplicate fields if there is more than one of the same field', () => {
      const createTemplateDto: CreateTemplateDto = {
        ...partialTemplate,
        html: 'Hello {{  NAME   }}, your name is {{  Name   }}.',
      }

      const result = templatesParsingService.parseTemplate(createTemplateDto)

      expect(result).toEqual({
        ...createTemplateDto,
        fields: ['name'],
        html: 'Hello {{name}}, your name is {{name}}.',
      })
    })

    it('invalid variables should be treated as plain text', () => {
      const createTemplateDto: CreateTemplateDto = {
        ...partialTemplate,
        html: 'Hello {{ Na%**123**E   }}, your email is {{keyWQ&&EI___Prd }}. Today is {{date_today}}.',
      }

      const result = templatesParsingService.parseTemplate(createTemplateDto)

      expect(result).toEqual({
        ...createTemplateDto,
        fields: ['date_today'],
        html: 'Hello {{ Na%**123**E   }}, your email is {{keyWQ&&EI___Prd }}. Today is {{date_today}}.',
      })
    })
  })
})
