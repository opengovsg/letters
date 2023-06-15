import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { ResponseError } from '~/types/ResponseError'
import { publicQueryKeys } from '~constants/query-keys'
import { api } from '~lib/api'
import { GetLetterPublicDto } from '~shared/dtos/letters.dto'

export const useLetterPublicId = (): { letterPublicId: string } => {
  const { letterPublicId } = useParams<{ letterPublicId: string }>()
  if (!letterPublicId) throw new Error('No letterPublicId provided')
  return { letterPublicId }
}

export const useGetLetterByPublicId = ({
  letterPublicId,
  password,
}: {
  letterPublicId: string
  password: string
}) => {
  const {
    data,
    isLoading,
    error,
    refetch: refetchLetter,
  } = useQuery<GetLetterPublicDto, ResponseError>(
    publicQueryKeys.letters(letterPublicId),
    () =>
      api
        .url(`/public/letters/${letterPublicId}`)
        .headers({ password })
        .get()
        .json<GetLetterPublicDto>(),
    { enabled: !!letterPublicId, retry: false },
  )
  return { letter: data, isLetterLoading: isLoading, error, refetchLetter }
}
