import { Box } from '@chakra-ui/react'
import { RestrictedGovtMasthead } from '@opengovsg/design-system-react'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <Box h="$100vh">
      <RestrictedGovtMasthead />
      <Outlet />
    </Box>
  )
}
