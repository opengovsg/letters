import { Box, ButtonGroup, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { Link } from 'react-router-dom'

import { useAdminAuth } from '~features/auth/context/AdminProtectedContext'

export const DashboardPage = (): JSX.Element => {
  const { adminUser } = useAdminAuth()

  return (
    <VStack alignItems="left" spacing="0px">
      <VStack pt={16} spacing={8} align={'center'}>
        <Box>Welcome {adminUser?.email}.</Box>
        <Box>
          YOU ARE NOW AUTHENTICATED. Replace this page with the root page of
          your application.
        </Box>
      </VStack>
    </VStack>
  )
}
