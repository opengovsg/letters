import { VStack } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

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
        <Editor
          disabled={true}
          initialValue={letter?.issuedLetter}
          init={{
            inline: true,
          }}
        />
      </VStack>
    </VStack>
  )
}
