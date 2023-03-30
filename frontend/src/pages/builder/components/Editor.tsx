import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Center } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { CodeAlt } from '@styled-icons/boxicons-regular/CodeAlt'
import { FormatBold } from '@styled-icons/material/FormatBold'
import { FormatItalic } from '@styled-icons/material/FormatItalic'
import { FormatQuote } from '@styled-icons/material/FormatQuote'
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined'
import { Looks3 } from '@styled-icons/material/Looks3'
import { Looks4 } from '@styled-icons/material/Looks4'
import { Looks5 } from '@styled-icons/material/Looks5'
import { Looks6 } from '@styled-icons/material/Looks6'
import { LooksOne } from '@styled-icons/material/LooksOne'
import { LooksTwo } from '@styled-icons/material/LooksTwo'
import {
  BlockToolbarButton,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  getPluginType,
  HeadingToolbar,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
  Plate,
  usePlateEditorRef,
} from '@udecode/plate'
import { EditableProps } from 'slate-react/dist/components/editable'

import { useEditor } from '~features/builder/EditorContext'
import { getCommonPlugins } from '~features/common/editor'

const createElement = (
  text: string,
  { type, mark }: { type?: string; mark?: string } = {},
) => {
  const leaf = { text, ...(mark ? { [mark]: true } : {}) }

  return {
    type: type || ELEMENT_PARAGRAPH,
    children: [leaf],
  }
}

const defaultValue = [
  createElement('🧱 Memos', { type: ELEMENT_H1 }),
  createElement('You can add {{keywords}} enclosed in {{ curly }} braces'),
  createElement('This text is bold.', { mark: MARK_BOLD }),
  createElement('This text is italic.', { mark: MARK_ITALIC }),
  createElement('This text is underlined.', {
    mark: MARK_UNDERLINE,
  }),

  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text is bold, italic and underlined.',
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
      },
    ],
  },
]

const BasicElementToolbarButtons = ({ id }: { id: string }) => {
  const editor = usePlateEditorRef(id)!

  return (
    <>
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H1)}
        icon={<LooksOne />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H2)}
        icon={<LooksTwo />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H3)}
        icon={<Looks3 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H4)}
        icon={<Looks4 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H5)}
        icon={<Looks5 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H6)}
        icon={<Looks6 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />}
      />
    </>
  )
}

const BasicMarkToolbarButtons = ({ id }: { id: string }) => {
  const editor = usePlateEditorRef(id)!

  return (
    <>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_CODE)}
        icon={<CodeAlt />}
      />
    </>
  )
}

export interface EditorProps {
  editableProps?: EditableProps
}
export const Editor = ({
  editableProps = { readOnly: false, autoFocus: false, spellCheck: false },
}: EditorProps): JSX.Element => {
  const { templateId } = useParams()
  const { activeEditorId, setActiveEditorId, status, initialEditorValue } =
    useEditor()
  const [waitForTemplate, setWaitForTemplate] = useState(true)
  const [readOnly] = useState<boolean>(editableProps?.readOnly || false)
  const plugins = getCommonPlugins()
  useEffect(() => {
    setActiveEditorId(templateId || '')
    setWaitForTemplate(!!templateId && initialEditorValue === null)
  }, [initialEditorValue, setActiveEditorId, templateId])

  return status === 'error' ? (
    <Center>Could not retrieve template</Center>
  ) : status === 'loading' || waitForTemplate ? (
    <Center>
      <Spinner></Spinner>
    </Center>
  ) : (
    <Plate
      id={activeEditorId}
      editableProps={editableProps}
      initialValue={
        initialEditorValue ? JSON.parse(initialEditorValue) : defaultValue
      }
      plugins={plugins}
    >
      {readOnly ? (
        <></>
      ) : (
        <HeadingToolbar>
          <BasicElementToolbarButtons id={activeEditorId} />
          <BasicMarkToolbarButtons id={activeEditorId} />
        </HeadingToolbar>
      )}
    </Plate>
  )
}
