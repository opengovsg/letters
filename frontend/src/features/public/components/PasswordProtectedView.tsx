import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  GridProps,
  Image,
  Input,
} from '@chakra-ui/react'
import { FC, FormEvent, PropsWithChildren } from 'react'

import ELetters from '~/assets/ELetters.svg'
import { ResponseError } from '~/types/ResponseError'
import { AppGrid } from '~templates/AppGrid'

interface PasswordProtectedViewProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  error: ResponseError
  password: string
  setPassword: (password: string) => void
  isLetterLoading: boolean
}

export const PasswordProtectedView = ({
  handleSubmit,
  error,
  password,
  setPassword,
  isLetterLoading,
}: PasswordProtectedViewProps): JSX.Element => {
  const BaseGridLayout = (props: GridProps) => (
    <AppGrid
      templateRows={{ md: 'auto 1fr auto', lg: '1fr auto' }}
      {...props}
    />
  )

  const PasswordGridArea: FC<PropsWithChildren> = ({ children }) => (
    <GridItem
      gridColumn={{ base: '1 / 5', md: '2 / 12', lg: '8 / 10' }}
      py="4rem"
      display="flex"
      alignItems={{ base: 'initial', lg: 'center' }}
      justifyContent="center"
    >
      {children}
    </GridItem>
  )

  const NonMobileSidebarGridArea: FC<PropsWithChildren> = ({ children }) => (
    <GridItem
      display={{ base: 'none', md: 'flex' }}
      gridColumn={{ md: '2 / 12', lg: '3 / 7' }}
      h={{ md: '20.5rem', lg: 'auto' }}
      pt={{ base: '1.5rem', md: '2.5rem', lg: '3rem' }}
      pb={{ lg: '3rem' }}
      flexDir="column"
      alignItems={{ base: 'center', lg: 'start' }}
      justifyContent={{ base: 'start', lg: 'center' }}
    >
      {children}
    </GridItem>
  )

  return (
    <BaseGridLayout flex={1} bg="white" h="100%">
      <NonMobileSidebarGridArea>
        <Image maxW="100%" maxH="100%" src={ELetters} />
      </NonMobileSidebarGridArea>

      <PasswordGridArea>
        <Box w="100%">
          <form noValidate onSubmit={(event) => handleSubmit(event)}>
            <FormControl
              isInvalid={
                !!error && error.json.message !== 'No Password provided'
              }
              mb="2.5rem"
            >
              <FormLabel fontWeight={700}>Unlock Letter</FormLabel>
              <Input
                type="password"
                placeholder="Enter password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormErrorMessage>{error.json.message}</FormErrorMessage>
              <Button mt={4} w="100%" isLoading={isLetterLoading} type="submit">
                Next
              </Button>
            </FormControl>
          </form>
        </Box>
      </PasswordGridArea>
    </BaseGridLayout>
  )
}
