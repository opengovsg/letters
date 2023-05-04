import { Center, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAdminAuth } from './AdminProtectedContext'

export const AdminProtectedRoute = ({
  children,
}: {
  children?: JSX.Element
}) => {
  const navigate = useNavigate()
  const { adminUser } = useAdminAuth()
  const [authorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    // Not logged in
    if (!adminUser) {
      navigate('/admin/login')
      return
    }
    setAuthorized(true)
  }, [navigate, adminUser])

  return (
    <>
      {authorized ? (
        children
      ) : (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  )
}
