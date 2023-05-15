import { Box, Spinner } from '@chakra-ui/react'
import { Editor as TinymceReactEditor } from '@tinymce/tinymce-react'

import {
  TinymceProvider,
  useTinymce,
} from '~features/tinymce/context/TinymceProvider'

interface LetterViewerProps {
  html: string | undefined
  isLoading: boolean
  isDisabled?: boolean
  isInline?: boolean
}

const TinymceEditor = ({
  html,
  isLoading,
  isDisabled = false,
  isInline = false,
}: LetterViewerProps): JSX.Element => {
  const { tinymceApiKey } = useTinymce()
  if (isLoading) {
    return <Spinner />
  }
  return (
    <Box border="1px" borderColor="grey.200" p={8} bg="white">
      <TinymceReactEditor
        apiKey={tinymceApiKey}
        initialValue={html}
        init={{
          inline: isInline,
          content_css_cors: true,
        }}
        disabled={isDisabled}
      />
    </Box>
  )
}

export const Editor = (props: JSX.IntrinsicAttributes & LetterViewerProps) => (
  <TinymceProvider>
    <TinymceEditor {...props} />
  </TinymceProvider>
)
