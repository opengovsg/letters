import { Button, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import { Navigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import { LetterViewer } from '~features/editor/components/LetterViewer'
import { convertHtmlToPdf, HEIGHT_A4, WIDTH_A4 } from '~utils/htmlUtils'

import {
  useGetLetterByPublicId,
  useLetterPublicId,
} from './hooks/letters.hooks'

export const LetterPublicPage = (): JSX.Element => {
  const { letterPublicId } = useLetterPublicId()
  const { letter, isLetterLoading } = useGetLetterByPublicId({
    letterPublicId,
  })

  const handleDownload = () => {
    if (letter && letter.issuedLetter) {
      void convertHtmlToPdf(letter.issuedLetter, `${letterPublicId}.pdf`)
    }
  }

  if (!isLetterLoading && !letter) {
    return <Navigate to={`/${routes.public.error}`} />
  }
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" data-react-helmet="true" />
      </Helmet>
      <VStack alignItems="left" spacing="0px">
        <VStack padding={16} spacing={8} align={'center'}>
          <LetterViewer
            letterPublicId={letterPublicId}
            html={letter?.issuedLetter}
            isLoading={isLetterLoading}
            minWidth={{ md: WIDTH_A4 }}
            minHeight={{ md: HEIGHT_A4 }}
          />
          <Button onClick={handleDownload}>Download as .PDF</Button>
        </VStack>
      </VStack>
    </>
  )
}
