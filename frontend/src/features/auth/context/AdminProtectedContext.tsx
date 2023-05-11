import { Center, Spinner } from '@chakra-ui/react'
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { UNAUTHORIZED_EVENT } from '~/constants/events'
import { useToast } from '~/hooks/useToast'
import { WhoAmIResponseDto } from '~shared/dtos/auth.dto'

import { useAdminLogout, useAdminUser } from '../hooks/auth.hooks'

type AdminAuthContextProps = {
  adminUser?: WhoAmIResponseDto
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(
  undefined
)

/**
 * Provider component that wraps your app and makes auth object available to any
 * child component that calls `useAdminAuth()`.
 */
export const AdminAuthProvider: FC<React.PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const navigate = useNavigate()
  const { adminUser, isLoadingAdminUser } = useAdminUser()
  const { adminLogout } = useAdminLogout({
    onSuccess: () => {
      navigate('/admin/login')
    },
  })

  const toast = useToast()

  const logout = useCallback(async (): Promise<void> => {
    await adminLogout()
    navigate('/admin')
  }, [adminLogout, navigate])

  const handleUnauthorizedEvent = useCallback(async () => {
    toast({
      status: 'error',
      description: 'Please login again.',
    })
    await logout()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initListeners = useCallback(() => {
    //eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorizedEvent)
  }, [handleUnauthorizedEvent])

  const removeListeners = useCallback(() => {
    //eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorizedEvent)
  }, [handleUnauthorizedEvent])

  // Initialise Listeners
  useEffect(() => {
    if (!adminUser) return

    initListeners()
    return removeListeners
  }, [adminUser, initListeners, removeListeners])

  if (isLoadingAdminUser) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

/**
 * Hook for components nested in ProvideAuth component to get the current auth object.
 */
export const useAdminAuth = (): AdminAuthContextProps => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error(
      `useAdminAuth must be used within a AdminAuthProvider component`
    )
  }
  return context
}
