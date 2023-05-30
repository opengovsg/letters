import { Box, Flex, Heading, Image, Stack, VStack } from '@chakra-ui/react'
import { datadogRum } from '@datadog/browser-rum'
import { Link as RouterLink, Outlet } from 'react-router-dom'

import { AppFooter } from '~/app/AppFooter'
import LogoSvg from '~/assets/Logo.svg'
import { routes } from '~constants/routes'

export const PublicLayout = () => {
  // Disable datadog RUM session replays for public pages
  datadogRum.stopSessionReplayRecording()
  return (
    <VStack minWidth="100%" align="stretch" spacing={0}>
      <Flex
        position="static"
        pos="relative"
        flexDir="row"
        p={6}
        justifyContent="space-between"
        borderBottom="1px"
        borderBottomColor="base.divider.medium"
        w="full"
        align="center"
      >
        <RouterLink to={routes.index}>
          <Stack direction="row" spacing={4}>
            <Image maxW="2rem" src={LogoSvg} ml={'8px'} />
            <Heading size="lg">Letters</Heading>
          </Stack>
        </RouterLink>
      </Flex>

      <Box minH="admin-content-min-height" w="full" bg="gray.100">
        <Outlet />
      </Box>
      <AppFooter />
    </VStack>
  )
}
