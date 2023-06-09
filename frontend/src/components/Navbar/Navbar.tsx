import { Flex, Heading, Image, Stack } from '@chakra-ui/react'
import { Suspense } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import LogoSvg from '~/assets/Logo.svg'
import { Loading } from '~/components/Loading'
import { routes } from '~/constants/routes'

import { UserMenu } from './components/UserMenu'

const NavbarBody = (): JSX.Element => {
  return (
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
      <UserMenu />
    </Flex>
  )
}

export const Navbar = () => (
  <Suspense fallback={<Loading />}>
    <NavbarBody />
  </Suspense>
)
