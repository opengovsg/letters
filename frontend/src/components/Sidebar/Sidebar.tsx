import { Box, Flex, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import { routes } from '~constants/routes'

import { SidebarButton } from './components/SidebarButton'

export const Sidebar = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  return (
    <Box bg="gray.100" w="full">
      <Flex align="stretch" minH="admin-content-min-height" w="full">
        <Box
          bg="grey.50"
          borderRight="1px"
          borderRightColor="base.divider.medium"
          w={{ base: 'full', md: 80 }}
        >
          <VStack w="full" align="stretch" spacing={0}>
            <SidebarButton
              name={'Templates'}
              isSelected={!!useMatch(`/admin/${routes.admin.templates}`)}
              onClick={() => navigate(`/admin/${routes.admin.templates}`)}
            />
            <SidebarButton
              name={'Issued Letters'}
              isSelected={!!useMatch(`/admin/${routes.admin.letters}`)}
              onClick={() => navigate(`/admin/${routes.admin.letters}`)}
            />
          </VStack>
        </Box>
        <Flex p={4} w="full" bgColor="white" minW={0}>
          {children}
        </Flex>
      </Flex>
    </Box>
  )
}
