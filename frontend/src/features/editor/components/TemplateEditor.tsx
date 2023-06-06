import { Spinner } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { useTinymceApiKey } from '../hooks/tinymce.hooks'

interface TemplateEditorProps {
  html: string | undefined
  onContentChange?: React.Dispatch<React.SetStateAction<string>>
  isDisabled?: boolean
}

export const TemplateEditor = ({
  html,
  onContentChange,
  isDisabled = false,
}: TemplateEditorProps): JSX.Element => {
  const { tinymceApiKey, isLoadingTinymceApiKey } = useTinymceApiKey()
  if (isLoadingTinymceApiKey || !html || !tinymceApiKey) {
    return <Spinner />
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
