import { GetTemplateDto } from '~shared/dtos/get-template.dto'

import { Template } from '../../database/entities'

export const mapTemplateToDto = (template: Template): GetTemplateDto => {
  return {
    id: template.id,
    fields: template.fields,
    html: template.html,
    name: template.name,
    thumbnailS3Path: template.thumbnailS3Path,
    createdAt: template.createdAt.toISOString(),
    updatedAt: template.updatedAt.toISOString(),
  }
}
