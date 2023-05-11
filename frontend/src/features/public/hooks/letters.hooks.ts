import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { publicQueryKeys } from '~constants/query-keys'
import { api } from '~lib/api'
import { GetLetterPublicDto } from '~shared/dtos/get-letter.dto'

export const useLetterPublicId = (): { letterPublicId: string } => {
  const { letterPublicId } = useParams<{ letterPublicId: string }>()
  if (!letterPublicId) throw new Error('No letterPublicId provided')
  return { letterPublicId }
}

export const useGetLetterByPublicId = ({
  letterPublicId,
}: {
  letterPublicId: string
}) => {
  const { data, isLoading } = useQuery<GetLetterPublicDto>(
    publicQueryKeys.letters(letterPublicId),
    () =>
      api
        .url(`/public/letters/${letterPublicId}`)
        .get()
        .json<GetLetterPublicDto>(),
    { enabled: !!letterPublicId },
  )
  return { letter: data, isLetterLoading: isLoading }
}
