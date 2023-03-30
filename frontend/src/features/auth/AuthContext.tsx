import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { LOGGED_IN_KEY } from '../localStorage/constants'
import { useLocalStorage } from '../localStorage/useLocalStorage'

import * as AuthService from './AuthService'

type AuthContextProps = {
  user?: any
  // isLoading: boolean
  sendLoginOtp: typeof AuthService.sendLoginOtp
  verifyLoginOtp: (params: { token: string; email: string }) => Promise<void>
  logout: typeof AuthService.logout
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

/**
 * Provider component that wraps your app and makes auth object available to any
 * child component that calls `useAuth()`.
 */
export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

/**
 * Hook for components nested in ProvideAuth component to get the current auth object.
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider component`)
  }
  return context
}

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>(LOGGED_IN_KEY)
  const [user, setUser] = useState<AuthService.User | undefined>(undefined)

  useEffect(() => {
    if (isLoggedIn)
      AuthService.fetchUser()
        .then((user) => {
          setUser(user)
        })
        .catch(() => setUser(undefined))
  }, [isLoggedIn])

  const queryClient = useQueryClient()
  const { data } = useQuery(
    'currentUser',
    () => AuthService.fetchUser(),
    // 10 minutes staletime, do not need to retrieve so often.
    { staleTime: 600000, enabled: !!isLoggedIn },
  )

  const verifyLoginOtp = useCallback(
    async (params: { token: string; email: string }) => {
      const isVerified = await AuthService.verifyLoginOtp(params)
      setIsLoggedIn(isVerified)
    },
    [setIsLoggedIn],
  )

  const logout = useCallback(async () => {
    await AuthService.logout()
    if (isLoggedIn) {
      // Clear logged in state.
      setIsLoggedIn(undefined)
      setUser(undefined)
    }
    queryClient.clear()
  }, [isLoggedIn, queryClient, setIsLoggedIn, setUser])

  // Return the user object and auth methods
  return {
    user: isLoggedIn ? data || user : undefined,
    sendLoginOtp: AuthService.sendLoginOtp,
    verifyLoginOtp: verifyLoginOtp,
    logout,
  }
}
