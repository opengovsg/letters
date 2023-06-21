import { Spinner } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { useTinymceApiKey } from '../hooks/tinymce.hooks'

interface TemplateEditorProps {
  onContentChange: React.Dispatch<React.SetStateAction<string>>
  isDisabled?: boolean
}

export const TemplateEditor = ({
  onContentChange,
  isDisabled = false,
}: TemplateEditorProps): JSX.Element => {
  const { tinymceApiKey, isLoadingTinymceApiKey } = useTinymceApiKey()
  if (isLoadingTinymceApiKey || !tinymceApiKey) return <Spinner />

  const processKeyword = (keyword: string) =>
    keyword
      .replace(/&nbsp;/g, '')
      .trim()
      .toLowerCase()

  return (
    <TinymceEditor
      apiKey={tinymceApiKey}
      initialValue={`<h1>This is a sample header</h1> You can add <span style="background-color: lightgray">{{keywords}}</span> enclosed in <span style="background-color: lightgray">{{curly}}</span> braces`}
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
