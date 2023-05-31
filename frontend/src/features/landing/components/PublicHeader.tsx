import {
  As,
  Button,
  Flex,
  FlexProps,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
} from '@chakra-ui/react'
import { BxsHelpCircle, IconButton } from '@opengovsg/design-system-react'
import { Link as RouterLink } from 'react-router-dom'

import LogoSvg from '~/assets/Logo.svg'
import { useIsDesktop } from '~/hooks/useIsDesktop'
import { BETA_SIGNUP, USER_GUIDE } from '~shared/constants/links'

type PublicHeaderLinkProps = {
  label: string
  href: string
  showOnMobile?: boolean
  MobileIcon?: As
}

const PUBLIC_HEADER_LINKS = [
  {
    label: 'Help',
    href: USER_GUIDE,
    showOnMobile: true,
    MobileIcon: BxsHelpCircle,
  },
]

const PublicHeaderLink = ({
  showOnMobile,
  MobileIcon,
  href,
  label,
}: PublicHeaderLinkProps) => {
  const isDesktop = useIsDesktop()

  if (!isDesktop && !showOnMobile) {
    return null
  }

  if (!isDesktop && MobileIcon) {
    return (
      <IconButton
        variant="clear"
        as="a"
        href={href}
        aria-label={label}
        icon={<MobileIcon fontSize="1.25rem" color="primary.500" />}
      />
    )
  }

  return (
    <Link href={href}>
      <Button w="fit-content" variant="link" color="primary.500">
        {label}
      </Button>
    </Link>
  )
}

export type PublicHeaderProps = FlexProps

export const PublicHeader = (props: FlexProps): JSX.Element => {
  return (
    <Flex
      justify="space-between"
      align="center"
      px={{ base: '1.5rem', md: '4.5rem', lg: '8rem' }}
      py={{ base: '0.625rem', md: '4.5rem' }}
      bg="primary.100"
      {...props}
    >
      <RouterLink to={'/'}>
        <Stack direction="row" spacing={4}>
          <Image src={LogoSvg} />
          <Heading>Letters</Heading>
        </Stack>
      </RouterLink>
      <HStack
        textStyle="subhead-1"
        spacing={{ base: '1rem', md: '2rem', xl: '2.5rem' }}
      >
        {PUBLIC_HEADER_LINKS.map((link, index) => (
          <PublicHeaderLink key={index} {...link} />
        ))}
        <RouterLink to="/admin/login">
          <Button>Login</Button>
        </RouterLink>
      </HStack>
    </Flex>
  )
}
