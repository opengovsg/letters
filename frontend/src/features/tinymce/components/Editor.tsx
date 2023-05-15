import { Box, Spinner } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { useTinymceApiKey } from '../hooks/tinymce.hooks'

interface LetterViewerProps {
  html: string | undefined
  isLoading: boolean
  isDisabled?: boolean
  isInline?: boolean
}

export const Editor = ({
  html,
  isLoading,
  isDisabled = false,
  isInline = false,
}: LetterViewerProps): JSX.Element => {
  const { tinymceApiKey } = useTinymceApiKey()
  if (isLoading || !tinymceApiKey) {
    return <Spinner />
  }
  return (
    <Box border="1px" borderColor="grey.200" p={8} bg="white">
      <TinymceEditor
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
