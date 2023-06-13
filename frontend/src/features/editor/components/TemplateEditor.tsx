import { Spinner } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { TEMPLATE_KEYWORD_CHAR_REGEX } from '~shared/constants/regex'

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

  if (isLoadingTinymceApiKey || !tinymceApiKey) {
    return <Spinner />
  }

  return (
    <TinymceEditor
      apiKey={tinymceApiKey}
      initialValue={`<h1>This is a sample header</h1> You can add <span style="background-color: lightgray">{{keywords}}</span> enclosed in <span style="background-color: lightgray">{{curly}}</span> braces`}
      init={{
        plugins: 'image code table help link',
        height: '100%',
        toolbar:
          'undo redo | bold italic underline | blocks fontfamily fontsizeinput | link image table',
        setup: (editor) => {
          editor.addCommand('highlight-core', function () {
            const lowerCaseValue = editor.selection
              .getContent()
              .toLowerCase()
              .trim()

            if (TEMPLATE_KEYWORD_CHAR_REGEX.test(lowerCaseValue))
              editor.selection.setContent(
                `<span style="background-color: lightgray">{{${lowerCaseValue}}}</span>`,
              )
            else
              editor.selection.setContent(
                `{{${editor.selection.getContent()}}}`,
              )
          })
          editor.addCommand('highlight-add-1', function () {
            const lowerCaseValue = editor.selection
              .getContent()
              .toLowerCase()
              .trim()

            if (TEMPLATE_KEYWORD_CHAR_REGEX.test(lowerCaseValue))
              editor.selection.setContent(
                `{<span style="background-color: lightgray">{{${lowerCaseValue}}}</span>}`,
              )
            else
              editor.selection.setContent(
                `{{{${editor.selection.getContent()}}}}`,
              )
          })
        },
        text_patterns: [
          {
            start: '{{{',
            end: '}}}',
            cmd: 'highlight-add-1',
          },
          {
            start: '{{',
            end: '}}',
            cmd: 'highlight-core',
          },
        ],
      }}
      disabled={isDisabled}
      onEditorChange={(content) => onContentChange(content)}
    />
  )
}
