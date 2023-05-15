import { useQuery } from '@tanstack/react-query'

import { api } from '~lib/api'
import { GetTemplateDto } from '~shared/dtos/templates.dto'

export const useGetTemplates = () => {
  const { data, isLoading } = useQuery(['templates'], () =>
    api.url(`/templates`).get().json<GetTemplateDto[]>(),
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { templates: data!, isTemplatesLoading: isLoading }
}
