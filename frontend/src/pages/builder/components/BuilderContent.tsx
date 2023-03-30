import { Flex } from '@chakra-ui/react'
import { EditableProps } from 'slate-react/dist/components/editable'

import { Editor } from '~pages/builder/components/Editor'

export const BuilderContent = ({
  readOnly = false,
}: EditableProps): JSX.Element => {
  return (
    <Flex flex={1} bg="neutral.200" justifyContent="center">
      <Flex
        bg="white"
        m="2rem"
        mb={0}
        flex={1}
        p="2.5rem 5rem"
        overflow="auto"
        maxW="57rem"
      >
        <Flex
          h="fit-content"
          bg="white"
          p="2.5rem"
          maxW="57rem"
          w="100%"
          flexDir="column"
        >
          <Editor
            editableProps={{ readOnly, autoFocus: false, spellCheck: false }}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
