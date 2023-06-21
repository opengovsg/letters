import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridProps,
  Image,
  Input,
} from '@chakra-ui/react'
import { FC, FormEvent, PropsWithChildren } from 'react'

import ELetters from '~/assets/ELetters.svg'
import { ResponseError } from '~/types/ResponseError'
import { AppGrid } from '~templates/AppGrid'
import { AuthGridArea } from '~templates/AuthGridArea'
import { GenericNonMobileSidebarGridArea } from '~templates/GenericNonMobileSidebarGridArea'

interface PasswordProtectedViewProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  error: ResponseError | null
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

  const PasswordGridArea: FC<PropsWithChildren> = ({ children }) => {
    return AuthGridArea({ children }, '8 / 10')
  }

  const NonMobileSidebarGridArea: FC<PropsWithChildren> = ({ children }) =>
    GenericNonMobileSidebarGridArea({ children }, '3 / 7')

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
              <FormErrorMessage>{error?.json.message}</FormErrorMessage>
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
