import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { api } from '~lib/api'
import {
  CreateBulkLetterDto,
  GetLetterPublicDto,
} from '~shared/dtos/letters.dto'
import { GetTemplateDto } from '~shared/dtos/templates.dto'

export const useTemplateId = (): { templateId: number } => {
  const { templateId } = useParams()
  if (!templateId) throw new Error('No templateId provided')
  return { templateId: Number(templateId) }
}

export const useGetTemplateById = (templateId: number) => {
  const { data, isLoading } = useQuery(['templates', templateId], () =>
    api.url(`/templates/${templateId}`).get().json<GetTemplateDto>(),
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { template: data!, isTemplatesLoading: isLoading }
}

export const useCreateBulkLetterMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: GetLetterPublicDto[]) => void
  onError?: () => void
} = {}) => {
  const queryClient = useQueryClient()

  return useMutation(
    async (body: CreateBulkLetterDto): Promise<GetLetterPublicDto[]> => {
      return await api
        .url(`/letters/bulks`)
        .post(body)
        .json<GetLetterPublicDto[]>()
    },
    {
      onSuccess: async (res: GetLetterPublicDto[]) => {
        // invalidate letters dashboard queries
        await queryClient.invalidateQueries(['letters'])
        onSuccess?.(res)
      },
      onError: (e) => {
        console.log('error', JSON.stringify(e))
        onError?.()
      },
    },
  )
}
