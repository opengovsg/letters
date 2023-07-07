import { VStack } from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Navigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import { LetterViewer } from '~features/editor/components/LetterViewer'
import { HEIGHT_A4, WIDTH_A4 } from '~utils/htmlUtils'

import { PasswordProtectedView } from './components/PasswordProtectedView'
import {
  useGetLetterByPublicId,
  useLetterPublicId,
} from './hooks/letters.hooks'

export const LetterPublicPage = (): JSX.Element => {
  const { letterPublicId } = useLetterPublicId()
  const [password, setPassword] = useState('')
  const [isPasswordProtected, setIsPasswordProtected] = useState(false)
  const [passwordInstructions, setPasswordInstructions] = useState('')

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
      <VStack alignItems="left" spacing="0px">
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
          <VStack padding={16} spacing={8} align={'center'}>
            <LetterViewer
              letterPublicId={letterPublicId}
              html={letter?.issuedLetter}
              isLoading={isLetterLoading}
              minWidth={{ md: WIDTH_A4 }}
              minHeight={{ md: HEIGHT_A4 }}
            />
          </VStack>
        )}
      </VStack>
    </>
  )
}
