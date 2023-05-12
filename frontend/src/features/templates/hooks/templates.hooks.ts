import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { api } from '~lib/api'
import { GetTemplateDto } from '~shared/dtos/get-template.dto'

export const useTemplateId = (): { templateId: number } => {
  const { templateId } = useParams()
  if (!templateId) throw new Error('No templateId provided')
  return { templateId: Number(templateId) }
}

export const useGetTemplateById = (templateId: number) => {
  const { data, isLoading } = useQuery(['templates'], () =>
    api.url(`/templates/${templateId}`).get().json<GetTemplateDto>(),
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { template: data!, isTemplatesLoading: isLoading }
}
