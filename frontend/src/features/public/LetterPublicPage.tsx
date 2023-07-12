import { Box, VStack } from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Navigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import { LetterViewer } from '~features/editor/components/LetterViewer'

import { PasswordProtectedView } from './components/PasswordProtectedView'
import {
  useGetLetterByPublicId,
  useLetterPublicId,
} from './hooks/letters.hooks'
import { useTransformScale } from './hooks/useTransformScale'

export const LetterPublicPage = (): JSX.Element => {
  const { letterPublicId } = useLetterPublicId()
  const [password, setPassword] = useState('')
  const [isPasswordProtected, setIsPasswordProtected] = useState(false)
  const [passwordInstructions, setPasswordInstructions] = useState('')
  const transformScale = useTransformScale()
  const [letterHeight, setLetterHeight] = useState<number | undefined>(0)

  const { letter, isLetterLoading, error, refetchLetter } =
    useGetLetterByPublicId({
      letterPublicId,
      password,
    })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await refetchLetter()
  }

  useEffect(() => {
    if (error?.json?.statusCode === 401) {
      setIsPasswordProtected(true)
      if (!passwordInstructions?.length) {
        setPasswordInstructions(error?.json?.passwordInstructions)
      }
    }
  }, [error])

  if (error && error.json?.statusCode !== 401) {
    return <Navigate to={`/${routes.public.error}`} />
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" data-react-helmet="true" />
      </Helmet>
      {isPasswordProtected && !letter ? (
        <PasswordProtectedView
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          handleSubmit={handleSubmit}
          error={error}
          password={password}
          setPassword={setPassword}
          isLetterLoading={isLetterLoading}
          passwordInstructions={passwordInstructions}
        />
      ) : (
        <Box w="full" bg="gray.100">
          <VStack
            padding={4}
            spacing={4}
            align={'center'}
            height={letterHeight ? letterHeight * transformScale + 50 : 'auto'}
          >
            <LetterViewer
              letterPublicId={letterPublicId}
              html={letter?.issuedLetter}
              isLoading={isLetterLoading}
              transform={`scale(${transformScale})`}
              transformOrigin="top"
              setHeight={setLetterHeight}
            />
          </VStack>
        </Box>
      )}
    </>
  )
}
