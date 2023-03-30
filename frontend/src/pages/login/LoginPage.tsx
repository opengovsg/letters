import { useMemo, useState } from 'react'
import {
  Box,
  chakra,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
  useBreakpointValue,
  Wrap,
} from '@chakra-ui/react'

import { ReactComponent as LoginImageSvg } from '~/assets/svgs/login.svg'
import { useAuth } from '~/features/auth/AuthContext'

import MemoLogo from '~assets/svgs/logo.svg'

import { LoginForm, LoginFormInputs } from './components/LoginForm'
import { OtpForm, OtpFormInputs } from './components/OtpForm'

const LoginImage = chakra(LoginImageSvg)
export type LoginOtpData = {
  email: string
}

export const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState<string>()
  const { sendLoginOtp, verifyLoginOtp } = useAuth()
  const currentYear = new Date().getFullYear()
  const isDesktop = useBreakpointValue({ base: false, xs: false, lg: true })
  const isTablet = useBreakpointValue({ base: false, xs: false, md: true })

  const footerLinks = useMemo(
    () => [
      { label: 'Contact Us', href: '' },
      { label: 'Guide', href: '' },
      { label: 'Privacy', href: '' },
      { label: 'Terms of Use', href: '' },
      { label: 'Report Vulnerability', href: '' },
    ],
    [],
  )

  const handleSendOtp = async ({ email }: LoginFormInputs) => {
    await sendLoginOtp(email)
    return setEmail(email)
  }

  const handleVerifyOtp = ({ otp }: OtpFormInputs) => {
    // Should not happen, since OtpForm component is only shown when there is
    // already an email state set.
    if (!email) {
      throw new Error('Something went wrong')
    }
    return verifyLoginOtp({ token: otp, email })
  }

  const handleResendOtp = async () => {
    // Should not happen, since OtpForm component is only shown when there is
    // already an email state set.
    if (!email) {
      throw new Error('Something went wrong')
    }
    await sendLoginOtp(email)
  }

  return (
    <Flex flexDir="column" minH="100vh">
      <Box
        flexGrow={1}
        px={{ base: '1.5rem', md: '5.5rem', lg: 0 }}
        bg={{
          base: 'initial',
          md: 'linear-gradient(180deg, var(--chakra-colors-primary-100) 20.625rem, white 0)',
          lg: 'linear-gradient(90deg, var(--chakra-colors-primary-100) 42%, white 0)',
        }}
      >
        <Grid
          minH={{ base: 'initial', lg: '100vh' }}
          maxW="90rem"
          margin="auto"
          templateAreas={{
            base: `'login'`,
            md: `'sidebar' 'login'`,
            lg: `'sidebar login' 'copy links'`,
          }}
          templateRows={{ lg: '1fr auto' }}
          templateColumns={{ lg: '5fr 7fr' }}
        >
          {isTablet && (
            <GridItem
              d="flex"
              gridArea="sidebar"
              bg={{ base: 'transparent', lg: 'primary.100' }}
              px={{ base: '1.5rem', lg: '5rem' }}
              pt={{ base: '1.5rem', md: '4rem', lg: '6rem' }}
              pb={{ lg: '6rem' }}
              flexDir="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Text
                display={{ base: 'none', lg: 'initial' }}
                textStyle="h3"
                color="#0E2245"
                fontSize="4xl"
                lineHeight="2.5rem"
              >
                Generate and issue personalised documents for citizens easily
              </Text>
              <LoginImage
                aria-hidden
                maxH={{ base: '22rem', lg: '28rem' }}
                w="100%"
                mt={{ base: '2rem', lg: '2.5rem' }}
              />
            </GridItem>
          )}

          <GridItem
            h="100%"
            gridArea="login"
            px={{ base: 0, lg: '7.25rem' }}
            py="4rem"
            d="flex"
            alignItems={{ base: 'initial', lg: 'center' }}
          >
            <Box
              maxW={{ base: '100%', lg: '28rem' }}
              w="100%"
              minH={{ base: 'auto', lg: '24rem' }}
              d="flex"
              flexDir="column"
              justifyContent="center"
            >
              <Flex flexDir="column" align="flex-start">
                <Image
                  src={MemoLogo}
                  mb={{ base: '2rem', lg: '2.5rem' }}
                ></Image>
              </Flex>
              {!email ? (
                <LoginForm onSubmit={handleSendOtp} />
              ) : (
                <OtpForm
                  onSubmit={handleVerifyOtp}
                  onResendOtp={handleResendOtp}
                />
              )}
            </Box>
          </GridItem>
          {isDesktop && (
            <>
              <GridItem
                gridArea="copy"
                bg={{ base: 'transparent', lg: 'primary.100' }}
                px={{ base: '1.5rem', lg: '5rem' }}
                pt="0.5rem"
                pb="4rem"
              >
                <Text textStyle="legal" color="black" fontSize="xs">
                  © {currentYear} Open Government Products, GovTech Singapore
                </Text>
              </GridItem>
              <GridItem
                px={{ base: '1.5rem', lg: '7.25rem' }}
                pt="0.5rem"
                pb="4rem"
                display={{ base: 'none', lg: 'flex' }}
                gridArea="links"
              >
                <Wrap
                  shouldWrapChildren
                  textStyle="legal"
                  spacing="1.5rem"
                  fontSize="xs"
                >
                  {footerLinks.map(({ label, href }, index) => (
                    <Link key={index} href={href}>
                      {label}
                    </Link>
                  ))}
                </Wrap>
              </GridItem>
            </>
          )}
        </Grid>
      </Box>
    </Flex>
  )
}
