import { Box, Spinner } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { useTinymceApiKey } from '../hooks/tinymce.hooks'

interface LetterViewerProps {
  html: string | undefined
  isLoading: boolean
  isDisabled?: boolean
  isInline?: boolean
}

interface TemplateEditorProps {
  html: string | undefined
  onContentChange?: React.Dispatch<React.SetStateAction<string>>
  isDisabled?: boolean
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
  // tinymce not enabled
  if (!tinymceApiKey) {
    return (
      <Box border="1px" borderColor="grey.200" bg="white">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Box>
    )
  }
  return (
    <Box border="1px" borderColor="grey.200" bg="white">
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

export const TemplateEditor = ({
  html,
  onContentChange,
  isDisabled = false,
}: TemplateEditorProps): JSX.Element => {
  const { tinymceApiKey, isLoadingTinymceApiKey } = useTinymceApiKey()
  if (isLoadingTinymceApiKey || !html) {
    return <Spinner />
  }
  if (!tinymceApiKey) {
    return (
      <Box border="1px" borderColor="grey.200" bg="white">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Box>
    )
  }

  const handleEditorChange = (content: string) => {
    if (onContentChange) onContentChange(content)
  }

  return (
    <TinymceEditor
      apiKey={tinymceApiKey}
      initialValue={html}
      init={{
        plugins: 'image code',
        height: '100%',
      }}
      disabled={isDisabled}
      onEditorChange={handleEditorChange}
    />
  )
}
