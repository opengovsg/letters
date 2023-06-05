import { Box, BoxProps, Spinner } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { sanitizeHtml } from '~shared/util/html-sanitizer'

import { useTinymceApiKey } from '../hooks/tinymce.hooks'

interface EditorProps extends BoxProps {
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
  ...styleProps
}: EditorProps): JSX.Element => {
  const { tinymceApiKey, isLoadingTinymceApiKey } = useTinymceApiKey()
  if (isLoading || isLoadingTinymceApiKey || !html) {
    return <Spinner />
  }
  const cleanHtml = sanitizeHtml(html)
  // tinymce not enabled
  if (!tinymceApiKey) {
    return (
      <Box {...styleProps} border="1px" borderColor="grey.200" bg="white">
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
      </Box>
    )
  }
  return (
    <Box {...styleProps} border="1px" borderColor="grey.200" bg="white">
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
        plugins: 'image code table help link',
        height: '100%',
        toolbar:
          'undo redo | bold italic underline | blocks fontfamily fontsizeinput | link image table',
      }}
      disabled={isDisabled}
      onEditorChange={handleEditorChange}
    />
  )
}
