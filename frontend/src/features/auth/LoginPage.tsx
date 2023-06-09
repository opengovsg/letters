import {
  Box,
  Flex,
  GridItem,
  GridProps,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppFooter } from '~/app/AppFooter'
import ELetters from '~/assets/ELetters.svg'
import LogoSvg from '~/assets/Logo.svg'
import { AppGrid } from '~templates/AppGrid'
import { AuthGridArea } from '~templates/AuthGridArea'
import { GenericNonMobileSidebarGridArea } from '~templates/GenericNonMobileSidebarGridArea'

import { LoginForm, LoginFormInputs } from './components/LoginForm'
import { OtpForm, OtpFormInputs } from './components/OtpForm'
import { useAdminAuth } from './context/AdminProtectedContext'
import {
  useAdminSendLoginOtp,
  useAdminVerifyLoginOtp,
} from './hooks/auth.hooks'

export type LoginOtpData = {
  email: string
}

// Component for the split blue/white background.
const BackgroundBox: FC<PropsWithChildren> = ({ children }) => (
  <Flex
    flex={1}
    overflow={{ lg: 'auto' }}
    flexDir="column"
    h="inherit"
    bgGradient={{
      md: 'linear(to-b, brand.primary.500 20.5rem, white 0)',
      lg: 'linear(to-r, brand.primary.500 calc(41.6667% - 4px), white 0)',
    }}
  >
    {children}
  </Flex>
)

// Component that controls the various grid areas according to responsive breakpoints.
const BaseGridLayout = (props: GridProps) => (
  <AppGrid templateRows={{ md: 'auto 1fr auto', lg: '1fr auto' }} {...props} />
)

// Grid area styling for the login form.
const LoginGridArea: FC<PropsWithChildren> = ({ children }) =>
  AuthGridArea({ children }, '8 / 12')

// Grid area styling for the footer.
const FooterGridArea: FC<PropsWithChildren> = ({ children }) => (
  <GridItem
    alignSelf="end"
    gridColumn={{ base: '1 / 5', md: '2 / 12' }}
    pb={{ base: 0, lg: '2.5rem' }}
    bg={{ base: 'base.canvas.brandLight', lg: 'transparent' }}
  >
    {children}
  </GridItem>
)

// Grid area styling for the left sidebar that only displays on tablet and desktop breakpoints.
const NonMobileSidebarGridArea: FC<PropsWithChildren> = ({ children }) =>
  GenericNonMobileSidebarGridArea({ children }, '2 / 7')

export const LoginPage = (): JSX.Element => {
  const { verifyLoginOtp } = useAdminVerifyLoginOtp()
  const { sendLoginOtp } = useAdminSendLoginOtp()
  const { adminUser } = useAdminAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>()

  const handleSendOtp = async ({ email }: LoginFormInputs) => {
    const trimmedEmail = email.trim()
    await sendLoginOtp({ email: trimmedEmail })
    return setEmail(trimmedEmail)
  }

  // If user is already logged in, redirect to dashboard.
  useEffect(() => {
    if (adminUser) navigate('/admin/templates')
  }, [navigate, adminUser])

  const handleVerifyOtp = async ({ token }: OtpFormInputs) => {
    // Should not happen, since OtpForm component is only shown when there is
    // already an email state set.
    if (!email) {
      throw new Error('Something went wrong')
    }
    return verifyLoginOtp({ token, email })
  }

  const handleResendOtp = async () => {
    // Should not happen, since OtpForm component is only shown when there is
    // already an email state set.
    if (!email) {
      throw new Error('Something went wrong')
    }
    await sendLoginOtp({ email })
  }

  return (
    <BackgroundBox>
      <BaseGridLayout flex={1} bg="white">
        <NonMobileSidebarGridArea>
          <Text textStyle="h1" marginBottom="10">
            Trusted e-letters from the Singapore Government
          </Text>
          <Image maxW="80%" maxH="100%" src={ELetters} />
        </NonMobileSidebarGridArea>
        <LoginGridArea>
          <Box minH={{ base: 'auto', lg: '17.25rem' }} w="100%">
            <Stack direction="row" spacing={4}>
              <Image src={LogoSvg} maxW="10rem" mb="2.5rem" />
              <Heading>Letters</Heading>
            </Stack>
            {!email ? (
              <LoginForm onSubmit={handleSendOtp} />
            ) : (
              <OtpForm
                email={email}
                onSubmit={async (values) => {
                  await handleVerifyOtp(values)
                }}
                onResendOtp={handleResendOtp}
              />
            )}
          </Box>
        </LoginGridArea>
      </BaseGridLayout>
      <BaseGridLayout bg="white">
        <FooterGridArea>
          <AppFooter variant={{ lg: 'compact' }} colorMode={'light'} />
        </FooterGridArea>
      </BaseGridLayout>
    </BackgroundBox>
  )
}
