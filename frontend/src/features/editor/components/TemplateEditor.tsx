import { Spinner } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { useTinymceApiKey } from '../hooks/tinymce.hooks'

interface TemplateEditorProps {
  html?: string
  onContentChange: React.Dispatch<React.SetStateAction<string>>
  isDisabled?: boolean
}

export const TemplateEditor = ({
  html,
  onContentChange,
  isDisabled = false,
}: TemplateEditorProps): JSX.Element => {
  const { tinymceApiKey, isLoadingTinymceApiKey } = useTinymceApiKey()
  if (isLoadingTinymceApiKey || !tinymceApiKey) return <Spinner />

  const initialHtml = `<h1>This is a sample header</h1> You can add {{keywords}} enclosed in {{curly}} braces`

  return (
    <TinymceEditor
      apiKey={tinymceApiKey}
      initialValue={html || initialHtml}
      init={{
        plugins: 'image code table help link',
        height: '100%',
        toolbar:
          'undo redo | bold italic underline | blocks fontfamily fontsizeinput | link image table',
      }}
      disabled={isDisabled}
      onEditorChange={(content) => onContentChange(content)}
    />
  )
}
