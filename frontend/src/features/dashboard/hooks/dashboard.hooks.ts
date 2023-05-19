import { useQuery } from '@tanstack/react-query'

import { api } from '~lib/api'
import { GetLettersDto } from '~shared/dtos/letters.dto'
import { GetTemplateDto } from '~shared/dtos/templates.dto'

export const useGetTemplates = () => {
  const { data, isLoading } = useQuery(['templates'], () =>
    api.url(`/templates`).get().json<GetTemplateDto[]>(),
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { templates: data!, isTemplatesLoading: isLoading }
}

export const useGetLetters = (limit: number, offset: number) => {
  const { data, isLoading } = useQuery(['letters', limit, offset], () =>
    api
      .url(`/letters?limit=${limit}&offset=${offset}`)
      .get()
      .json<GetLettersDto>(),
  )
  return {
    letters: data?.letters,
    count: data?.count,
    isLettersLoading: isLoading,
  }
}
