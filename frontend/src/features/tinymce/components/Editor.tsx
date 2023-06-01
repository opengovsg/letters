import { Box, Spinner } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { sanitizeHtml } from '~shared/util/html-sanitizer'
import { HEIGHT_A4, WIDTH_A4 } from '~utils/htmlUtils'

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
  if (isLoading || isLoadingTinymceApiKey || !html) {
    return <Spinner />
  }
  const cleanHtml = sanitizeHtml(html)
  // tinymce not enabled
  if (!tinymceApiKey) {
    return (
      <Box
        border="1px"
        borderColor="grey.200"
        bg="white"
        minWidth={{ md: WIDTH_A4 }}
        minHeight={{ md: HEIGHT_A4 }}
      >
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
      </Box>
    )
  }
  return (
    <Box
      border="1px"
      borderColor="grey.200"
      bg="white"
      minWidth={{ md: WIDTH_A4 }}
      minHeight={{ md: HEIGHT_A4 }}
    >
      <TinymceEditor
        apiKey={tinymceApiKey}
        initialValue={cleanHtml}
        init={{
          inline: isInline,
          content_css_cors: true,
        }}
        disabled={isDisabled}
      />
    </Box>
  )
}
