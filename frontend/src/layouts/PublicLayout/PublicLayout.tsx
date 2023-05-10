import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import { Link as RouterLink, Outlet } from 'react-router-dom'

import { AppFooter } from '~/app/AppFooter'
import { UserMenu } from '~components/Navbar/components/UserMenu'
import { routes } from '~constants/routes'
// import LogoSvg from '~/assets/Logo.svg'

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
        {/* <Image maxW="8rem" src={LogoSvg} /> */}
        <RouterLink to={routes.index}>
          {/* <Image maxW="8rem" src={LogoSvg} ml={'8px'} /> */}
          Letters
        </RouterLink>
      </Flex>

      <Box minH="admin-content-min-height" w="full" bg="gray.100">
        <Outlet />
      </Box>
      <AppFooter />
    </VStack>
  )
}
