import { useQuery } from 'react-query'

import { getTemplate, Template } from '~features/templates/TemplatesService'

export const useTemplate = (
  templateId: number,
): {
  isLoading: boolean
  isError: boolean
  data?: Template
} => {
  const { isLoading, isError, data } = useQuery(
    ['template', templateId],
    () => getTemplate(templateId),
    {
      retry: false,
    },
  )

  return { isLoading, isError, data }
}
