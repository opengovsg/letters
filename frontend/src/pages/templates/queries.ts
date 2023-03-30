import { useQuery, UseQueryResult } from 'react-query'

import {
  getTemplatesView,
  TemplateMetaResponseDto,
} from '~/pages/dashboard/DashboardService'

import { useAuth } from '~features/auth/AuthContext'

const templatesKeys = {
  all: ['templates'] as const,
}

export const useTemplatesDashboard = (): UseQueryResult<
  TemplateMetaResponseDto[]
> => {
  const { user } = useAuth()

  return useQuery(templatesKeys.all, () => getTemplatesView(user.id), {
    staleTime: 5000,
  })
}
