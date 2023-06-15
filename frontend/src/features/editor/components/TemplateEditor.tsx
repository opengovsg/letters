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
  if (isLoadingTinymceApiKey || !tinymceApiKey) return <Spinner />

  const processKeyword = (keyword: string) => keyword.toLowerCase().trim()

  return (
    <TinymceEditor
      apiKey={tinymceApiKey}
      initialValue={`<h1>This is a sample header</h1> You can add <span style="background-color: lightgray">{{keywords}}</span> enclosed in <span style="background-color: lightgray">{{curly}}</span> braces`}
      init={{
        plugins: 'image code table help link powerpaste preview',
        height: '100%',
        toolbar:
          'undo redo | bold italic underline | blocks fontfamily fontsizeinput | link image table | preview',
        setup: (editor) => {
          editor.addCommand('highlight-brace-core', () => {
            const keyword = processKeyword(editor.selection.getContent())
            TEMPLATE_KEYWORD_CHAR_REGEX.test(keyword)
              ? editor.selection.setContent(
                  `<span style="background-color: lightgray">{{${keyword}}}</span>`,
                )
              : editor.selection.setContent(
                  `{{${editor.selection.getContent()}}}`,
                )
          })
          editor.addCommand('highlight-brace-add-1', () => {
            const keyword = processKeyword(editor.selection.getContent())
            TEMPLATE_KEYWORD_CHAR_REGEX.test(keyword)
              ? editor.selection.setContent(
                  `{<span style="background-color: lightgray">{{${keyword}}}</span>}`,
                )
              : editor.selection.setContent(
                  `{{{${editor.selection.getContent()}}}}`,
                )
          })
        },
        text_patterns: [
          {
            start: '{{{',
            end: '}}}',
            cmd: 'highlight-brace-add-1',
          },
          {
            start: '{{',
            end: '}}',
            cmd: 'highlight-brace-core',
          },
        ],
      }}
      disabled={isDisabled}
      onEditorChange={(content) => onContentChange(content)}
    />
  )
}
