import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { AppFooter } from '~/app/AppFooter'
// import LogoSvg from '~/assets/Logo.svg'

export const PublicLayout = () => {
  return (
    <VStack minWidth="100%" align="stretch" spacing={0}>
      <Flex
        position="static"
        pos="relative"
        flexDir="row"
        px={6}
        py={2}
        justifyContent="space-between"
        borderBottom="1px"
        borderBottomColor="base.divider.medium"
        w="full"
        align="center"
      >
        {/* <Image maxW="8rem" src={LogoSvg} /> */}
      </Flex>
      <Box minH="admin-content-min-height" w="full" bg="gray.100">
        <Outlet />
      </Box>
      <AppFooter />
    </VStack>
  )
}
