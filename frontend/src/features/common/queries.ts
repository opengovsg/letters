import { useQuery, UseQueryResult } from 'react-query'
import { useParams } from 'react-router-dom'

import * as BuilderService from '~/features/builder/BuilderService'

import { HttpError } from '~services/ApiService'

export const useTemplate = (): UseQueryResult<
  BuilderService.GetTemplateResponseDto,
  HttpError | Error
> => {
  const { templateId } = useParams()
  return useQuery(
    ['getTemplate', templateId],
    () => {
      if (!templateId) throw new Error('templateId not provided')
      return BuilderService.getTemplate({ templateId: templateId })
    },
    {
      enabled: !!templateId,
    },
  )
}
