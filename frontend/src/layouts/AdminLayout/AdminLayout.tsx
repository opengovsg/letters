import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { AppFooter } from '~/app/AppFooter'
import { Sidebar } from '~/components/Sidebar'
import { Navbar } from '~components/Navbar/Navbar'

export const AdminLayout = () => {
  return (
    <VStack minWidth="100%" align="stretch" spacing={0}>
      <Navbar />
      <Box px="admin-app-px">
        <Sidebar>
          <Outlet />
        </Sidebar>
      </Box>
      <AppFooter containerProps={{ px: '3rem' }} />
    </VStack>
  )
}
