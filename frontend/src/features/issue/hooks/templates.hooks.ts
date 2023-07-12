import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { WretchError } from 'wretch/types'

import { api } from '~lib/api'
import {
  BulkLetterValidationResultDto,
  BulkLetterValidationResultError,
  CreateBulkLetterDto,
  GetBulkLetterDto,
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

export const useValidateBulkLetterMutation = ({
  onError,
}: {
  onError?: (res: BulkLetterValidationResultError[]) => void
} = {}) => {
  return useMutation(
    async (
      body: CreateBulkLetterDto,
    ): Promise<BulkLetterValidationResultDto> => {
      return await api
        .url(`/letters/validate`)
        .post(body)
        .json<BulkLetterValidationResultDto>()
    },
    {
      onError: (e: WretchError) => {
        const err = e.json as BulkLetterValidationResultDto
        if (!err.errors) return
        onError?.(err.errors)
      },
    },
  )
}

export const useCreateBulkLetterMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: GetBulkLetterDto[]) => void
  onError?: (errors: BulkLetterValidationResultError[]) => void
} = {}) => {
  const queryClient = useQueryClient()
  return useMutation(
    async (body: CreateBulkLetterDto): Promise<GetBulkLetterDto[]> => {
      return await api
        .url(`/letters/bulks`)
        .post(body)
        .json<GetBulkLetterDto[]>()
    },
    {
      onSuccess: async (res: GetBulkLetterDto[]) => {
        // invalidate letters dashboard queries
        await queryClient.invalidateQueries(['letters'])
        onSuccess?.(res)
      },
      onError: (e: WretchError) => {
        const err = e.json as BulkLetterValidationResultDto
        if (!err.errors) return
        onError?.(err.errors)
      },
    },
  )
}
