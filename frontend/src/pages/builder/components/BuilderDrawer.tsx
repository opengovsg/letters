import { useMemo } from 'react'
import { Flex } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import {
  DrawerTabs,
  useBuilderDrawer,
} from '~features/builder/BuilderDrawerContext'

import { Keywords } from '../Keywords'

import { MotionBox } from './MotionBox'

const DRAWER_MOTION_PROPS = {
  initial: { width: 0 },
  animate: {
    maxWidth: '33.25rem',
    width: '36%',
    transition: {
      bounce: 0,
      duration: 0.2,
    },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const BuilderDrawer = (): JSX.Element => {
  const { isShowDrawer, activeTab } = useBuilderDrawer()

  const renderDrawerContent = useMemo(() => {
    switch (activeTab) {
      case DrawerTabs.AddElements: {
        return <Keywords />
      }
    }
  }, [activeTab])

  return (
    <AnimatePresence>
      {isShowDrawer ? (
        <MotionBox
          bg="white"
          key="sidebar"
          pos="relative"
          as="aside"
          overflow="hidden"
          {...DRAWER_MOTION_PROPS}
        >
          <Flex w="100%" h="100%" minW="max-content" flexDir="column">
            {renderDrawerContent}
          </Flex>
        </MotionBox>
      ) : null}
    </AnimatePresence>
  )
}
