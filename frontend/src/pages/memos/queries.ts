import { useQuery, UseQueryResult } from 'react-query'

import {
  getMemosView,
  MemoMetaResponseDto,
} from '~/pages/dashboard/DashboardService'

import { useAuth } from '~features/auth/AuthContext'

const memosKeys = {
  all: ['memos'] as const,
}

export const useMemosDashboard = (): UseQueryResult<MemoMetaResponseDto[]> => {
  const { user } = useAuth()
  return useQuery(memosKeys.all, () => getMemosView(user.id), {
    staleTime: 5000,
  })
}
