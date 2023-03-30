import { useEffect, useState } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { usePlateSelectors } from '@udecode/plate'
import { Node } from 'slate'

import { getKeywords, serializeNodesToString } from '~pages/builder/util'
import { useEditor } from '~features/builder/EditorContext'

export const Keywords = (): JSX.Element => {
  const [keywords, setKeywords] = useState<string[]>([])
  // Debug
  const [debugTextValue, setDebugTextValue] = useState<string>('')

  const { activeEditorId } = useEditor()
  const { value: getValue } = usePlateSelectors(activeEditorId)
  const value: Node[] | null = getValue()
  useEffect(() => {
    if (value) {
      const textValue = serializeNodesToString(value || [])
      setKeywords(getKeywords(textValue))
      setDebugTextValue(textValue)
    } else {
      setKeywords([])
      setDebugTextValue('')
    }
  }, [value])

  return (
    <VStack align="start">
      <Text textStyle="h3">Keywords detected</Text>

      <Box>
        {keywords.map((word, i) => {
          return <Text key={word + i}>{word}</Text>
        })}
      </Box>

      <Text textStyle="h3">Debug Text</Text>
      <Box maxWidth="fit-content">{debugTextValue}</Box>
    </VStack>
  )
}
