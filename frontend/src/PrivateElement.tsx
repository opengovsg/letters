import { Navigate, NavigateProps, useLocation } from 'react-router-dom'

import { LOGIN_ROUTE } from '~constants/routes'

import { useAuth } from '~features/auth/AuthContext'

interface PrivateElementProps {
  /**
   * Route to redirect to when user is not authenticated. Defaults to
   * `LOGIN_ROUTE` if not provided.
   */
  redirectTo?: NavigateProps['to']
  element: React.ReactElement
}

export const PrivateElement = ({
  element,
  redirectTo = LOGIN_ROUTE,
}: PrivateElementProps): React.ReactElement => {
  const location = useLocation()

  const { user } = useAuth()

  return user ? (
    element
  ) : (
    <Navigate replace to={redirectTo} state={{ from: location }} />
  )
}
