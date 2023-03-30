import { Flex } from '@chakra-ui/react'

import { BuilderDrawerProvider } from '~features/builder/BuilderDrawerContext'
import { EditorContextProvider } from '~features/builder/EditorContext'

import { BuilderContent } from './components/BuilderContent'
import { BuilderDrawer } from './components/BuilderDrawer'
import { BuilderNavBarContainer } from './components/BuilderNavBarContainer'
import { BuilderSidebar } from './components/BuilderSideBar'

export const Builder = (): JSX.Element => {
  return (
    <EditorContextProvider>
      <Flex flexDir="column" height="100vh" overflow="hidden" pos="relative">
        <BuilderNavBarContainer />
        <Flex
          h="100%"
          w="100%"
          overflow="auto"
          bg="neutral.200"
          direction="row"
        >
          <BuilderDrawerProvider>
            <BuilderSidebar />
            <BuilderDrawer />
          </BuilderDrawerProvider>
          <BuilderContent />
        </Flex>
      </Flex>
    </EditorContextProvider>
  )
}
