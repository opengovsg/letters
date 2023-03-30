import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { DASHBOARD_ROUTE } from '~constants/routes'

import { useAuth } from '~features/auth/AuthContext'

import { NavBar } from './NavBar'

const useDashboardNavBar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const handleBackToDashboard = useCallback(
    (): void => navigate(DASHBOARD_ROUTE),
    [navigate],
  )

  const handleLogout = useCallback((): void => {
    logout()
  }, [logout])

  return {
    userInfo: { email: user.email },
    handleBackToDashboard,
    handleLogout,
  }
}

/**
 * @precondition Must have AdminFormTabProvider parent due to usage of TabList and Tab.
 */
export const NavBarContainer = (): JSX.Element => {
  const { userInfo, handleBackToDashboard, handleLogout } = useDashboardNavBar()

  return (
    <NavBar
      userInfo={userInfo}
      handleBackButtonClick={handleBackToDashboard}
      handleLogoutButtonClick={handleLogout}
    />
  )
}
