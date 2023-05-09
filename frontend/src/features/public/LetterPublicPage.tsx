import { Spinner, VStack } from '@chakra-ui/react'

import { LetterViewer } from './components/LetterViewer'
import {
  useGetLetterByPublicId,
  useLetterPublicId,
} from './hooks/letters.hooks'

export const LetterPublicPage = (): JSX.Element => {
  const { letterPublicId } = useLetterPublicId()
  const { letter, isLetterLoading } = useGetLetterByPublicId({ letterPublicId })

  return (
    <VStack alignItems="left" spacing="0px">
      <VStack padding={16} spacing={8} align={'center'}>
        <LetterViewer
          htmlLetter={letter?.issuedLetter}
          isLoading={isLetterLoading}
        />
      </VStack>
    </VStack>
  )
}
