import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '~hooks/useToast'
import { api } from '~lib/api'
import { CreateTemplateDto, GetTemplateDto } from '~shared/dtos/templates.dto'

export const useCreateTemplateMutation = ({
  onSuccess,
}: {
  onSuccess?: (res: GetTemplateDto) => void
} = {}) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation(
    async (body: CreateTemplateDto): Promise<GetTemplateDto> => {
      try {
        return await api.url(`/templates`).post(body).json<GetTemplateDto>()
      } catch (error) {
        throw new Error('Failed to create template')
      }
    },
    {
      onSuccess: async (res: GetTemplateDto) => {
        await queryClient.invalidateQueries(['templates'])
        onSuccess?.(res)
        toast({
          title: 'New template created!',
          status: 'success',
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to create template',
          status: 'error',
        })
      },
    },
  )
}
