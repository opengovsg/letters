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
  const { tinymceApiKey, isLoadingTinymceApiKey } = useTinymceApiKey()
  if (isLoading || !html) {
    return <Spinner />
  }
  // tinymce not enabled
  if (!isLoadingTinymceApiKey && !tinymceApiKey) {
    return (
      <Box border="1px" borderColor="grey.200" p={8} bg="white">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Box>
    )
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
