import { Flex, Heading, Image, Stack, VStack } from '@chakra-ui/react'
import { Link as RouterLink, Outlet } from 'react-router-dom'

import { AppFooter } from '~/app/AppFooter'
import LogoSvg from '~/assets/Logo.svg'
import { routes } from '~constants/routes'

export const PublicLayout = () => {
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
      <Outlet />
      <AppFooter />
    </VStack>
  )
}
