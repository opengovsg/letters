import { BiUserPlus } from 'react-icons/bi'
import { Stack } from '@chakra-ui/react'

import {
  DrawerTabs,
  useBuilderDrawer,
} from '~features/builder/BuilderDrawerContext'

import { DrawerTabIcon } from './DrawerTabIcon'

export const BuilderSidebar = (): JSX.Element => {
  const { activeTab, handleAddElementClick } = useBuilderDrawer()

  return (
    <Stack
      bg="white"
      spacing="0.5rem"
      py="1rem"
      px="0.5rem"
      borderRight="1px solid"
      borderColor="neutral.300"
    >
      <DrawerTabIcon
        label="Add Elements"
        icon={<BiUserPlus fontSize="1.5rem" />}
        onClick={handleAddElementClick}
        isActive={activeTab === DrawerTabs.AddElements}
      />
    </Stack>
  )
}
