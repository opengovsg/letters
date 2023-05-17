import { useQuery } from '@tanstack/react-query'

import { api } from '~lib/api'

export const useTinymceApiKey = () => {
  const { data, isLoading } = useQuery<string | undefined>(
    ['tinymce-api-key'],
    () => api.get('/config/tinymceApiKey').json<string>(),
  )
  return { tinymceApiKey: data, isLoadingTinymceApiKey: isLoading }
}
