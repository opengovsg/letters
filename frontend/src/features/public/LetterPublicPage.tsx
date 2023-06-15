import { Button, VStack } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import { LetterViewer } from '~features/editor/components/LetterViewer'
import { convertHtmlToPdf, HEIGHT_A4, WIDTH_A4 } from '~utils/htmlUtils'

import { PasswordProtectedView } from './components/PasswordProtectedView'
import {
  useGetLetterByPublicId,
  useLetterPublicId,
} from './hooks/letters.hooks'

export const LetterPublicPage = (): JSX.Element => {
  const { letterPublicId } = useLetterPublicId()
  const [password, setPassword] = useState('')

  const { letter, isLetterLoading, error, refetchLetter } =
    useGetLetterByPublicId({
      letterPublicId,
      password,
    })

  const handleDownload = () => {
    if (letter && letter.issuedLetter) {
      void convertHtmlToPdf(letter.issuedLetter, `${letterPublicId}.pdf`)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await refetchLetter()
  }

  if (error && error.json?.statusCode !== 401) {
    return <Navigate to={`/${routes.public.error}`} />
  }

  return (
    <VStack alignItems="left" spacing="0px">
      {error && error.json?.statusCode === 401 ? (
        <PasswordProtectedView
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          handleSubmit={handleSubmit}
          error={error}
          password={password}
          setPassword={setPassword}
          isLetterLoading={isLetterLoading}
        />
      ) : (
        <VStack padding={16} spacing={8} align={'center'}>
          <LetterViewer
            html={letter?.issuedLetter}
            isLoading={isLetterLoading}
            minWidth={{ md: WIDTH_A4 }}
            minHeight={{ md: HEIGHT_A4 }}
          />
          {!isLetterLoading && (
            <Button onClick={handleDownload}>Download as .PDF</Button>
          )}
        </VStack>
      )}
    </VStack>
  )
}
