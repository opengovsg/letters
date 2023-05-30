import { Box, VStack } from '@chakra-ui/react'
import { datadogRum } from '@datadog/browser-rum'
import { Outlet } from 'react-router-dom'

import { AppFooter } from '~/app/AppFooter'
import { Sidebar } from '~/components/Sidebar'
import { Navbar } from '~components/Navbar/Navbar'
import { initDatadog } from '~lib/monitoring'

export const AdminLayout = () => {
  // Initialise and enable datadog RUM and session replays for admin pages
  initDatadog()
  datadogRum.startSessionReplayRecording()
  return (
    <VStack minWidth="100%" align="stretch" spacing={0}>
      <Navbar />
      <Box px="admin-app-px" minH="admin-content-min-height">
        <Sidebar>
          <Outlet />
        </Sidebar>
      </Box>
      <AppFooter containerProps={{ px: '3rem' }} />
    </VStack>
  )
}
