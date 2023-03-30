import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { MemosPage } from '~pages/memos/MemosPage'
import { TemplatesPage } from '~pages/templates/TemplatesPage'

import { NavBarContainer } from './components/NavBarContainer'

export const Dashboard = (): JSX.Element => {
  return (
    <Flex flexDir="column" height="100vh" overflow="hidden" pos="relative">
      <NavBarContainer />
      <Flex h="100%" w="100%" overflow="auto" direction="row">
        <Tabs isFitted orientation="vertical" w="100%">
          <TabList
            // px={{ base: '0.5rem', md: '0.75rem', lg: '1rem' }}
            w={{ base: '20ch' }}
            gridArea="tabs"
            borderBottom="none"
            justifyContent={{ base: 'flex-start', lg: 'center' }}
            alignSelf="flex-start"
            alignItems="stretch"
          >
            <Tab>All Templates</Tab>
            <Tab>All Memos</Tab>
          </TabList>
          <TabPanels bg="neutral.100">
            <TabPanel padding="0">
              <TemplatesPage />
            </TabPanel>
            <TabPanel padding="0">
              <MemosPage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  )
}
