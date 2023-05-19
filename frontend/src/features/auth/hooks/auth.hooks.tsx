import { datadogRum } from '@datadog/browser-rum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/api'
import {
  SendLoginOtpRequestDto,
  SendLoginOtpResponseDto,
  VerifyOtpRequestDto,
  VerifyOtpResponseDto,
  WhoAmIResponseDto,
} from '~shared/dtos/auth.dto'

export const useAdminUser = () => {
  const { data, isLoading } = useQuery<WhoAmIResponseDto | undefined>(
    ['admin-who-am-i'],
    () => api.get('/auth/whoami').json<WhoAmIResponseDto>(),
  )
  if (data?.id && data?.email) {
    datadogRum.setUser({
      id: data.id.toString(),
      email: data.email,
    })
  }
  return { adminUser: data, isLoadingAdminUser: isLoading }
}

export const useAdminVerifyLoginOtp = () => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(
    (params: VerifyOtpRequestDto) =>
      api.url('/auth/verify').post(params).json<VerifyOtpResponseDto>(),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['admin-who-am-i'])
      },
    },
  )
  return { verifyLoginOtp: mutateAsync }
}

export const useAdminSendLoginOtp = () => {
  const { mutateAsync } = useMutation((params: SendLoginOtpRequestDto) => {
    return api.url('/auth').post(params).json<SendLoginOtpResponseDto>()
  })
  return { sendLoginOtp: mutateAsync }
}

export const useAdminLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
} = {}) => {
  const queryCache = useQueryClient()

  const { mutateAsync: adminLogout, isLoading: isLoggingOut } =
    useMutation<void>(() => api.url('/auth/logout').post().res(), {
      onSuccess: () => {
        queryCache.removeQueries(['admin-who-am-i'])
        onSuccess?.()
      },
      onError,
    })
  return { adminLogout, isLoggingOut }
}
