import { FC, useEffect } from 'react'
import { getPlateActions, Plate } from '@udecode/plate'

import { getCommonPlugins } from '~features/common/editor'

interface ReadonlyEditorProps {
  value: string
}

export const ReadonlyEditor: FC<ReadonlyEditorProps> = ({ value }) => {
  const editor = getPlateActions()
  const plugins = getCommonPlugins()

  useEffect(() => {
    const parsedValue = JSON.parse(value)
    editor.resetEditor()
    editor.value(parsedValue)
  }, [value, editor])

  return (
    <Plate
      editableProps={{ readOnly: true }}
      initialValue={[]}
      plugins={plugins}
    />
  )
}
