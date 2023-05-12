import { VStack } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import { Editor } from '~features/tinymce/components/Editor'

import {
  useGetLetterByPublicId,
  useLetterPublicId,
} from './hooks/letters.hooks'

export const LetterPublicPage = (): JSX.Element => {
  const { letterPublicId } = useLetterPublicId()
  const { letter, isLetterLoading } = useGetLetterByPublicId({
    letterPublicId,
  })

  if (!isLetterLoading && !letter) {
    return <Navigate to={`/${routes.public.error}`} />
  }
  return (
    <VStack alignItems="left" spacing="0px">
      <VStack padding={16} spacing={8} align={'center'}>
        <Editor
          html={letter?.issuedLetter}
          isLoading={isLetterLoading}
          isDisabled={true}
          isInline={true}
        />
      </VStack>
    </VStack>
  )
}
