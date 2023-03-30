import {
  BiBlock,
  BiChevronDown,
  BiChevronUp,
  BiCopy,
  BiDownload,
} from 'react-icons/bi'
import { ButtonGroup, MenuButton, MenuDivider } from '@chakra-ui/react'

import Button from '~components/Button'
import IconButton from '~components/IconButton'
import Menu from '~components/Menu'

import { RowActionsProps } from './RowActions'
import { useRowActionDropdown } from './useRowActionDropdown'

export const RowActionsDropdown = ({
  isDisabled,
  memoId,
  slug,
}: RowActionsProps): JSX.Element => {
  const {
    handleViewMemo,
    handleCopyWeblink,
    handleDownloadCsv,
    handleVoidMemo,
  } = useRowActionDropdown(memoId, slug)

  return (
    <Menu
      placement="bottom-end"
      // Prevents massize render load when there are a ton of rows
      isLazy
    >
      {({ isOpen }) => (
        <>
          <ButtonGroup
            isAttached
            variant="outline"
            colorScheme="secondary"
            display={{ base: 'none', md: 'flex' }}
          >
            <Button px="1.5rem" mr="-1px" onClick={handleViewMemo}>
              View
            </Button>
            <MenuButton
              as={IconButton}
              isDisabled={isDisabled}
              _active={{ bg: 'secondary.100' }}
              isActive={isOpen}
              aria-label="More actions"
              icon={isOpen ? <BiChevronUp /> : <BiChevronDown />}
            />
          </ButtonGroup>
          <Menu.List>
            <Menu.Item
              onClick={handleCopyWeblink}
              icon={<BiCopy fontSize="1.25rem" />}
            >
              Copy Weblink
            </Menu.Item>
            <Menu.Item
              onClick={handleDownloadCsv}
              icon={<BiDownload fontSize="1.25rem" />}
            >
              Download CSV
            </Menu.Item>
            <MenuDivider />
            <Menu.Item
              onClick={handleVoidMemo}
              color="danger.500"
              icon={<BiBlock fontSize="1.25rem" />}
            >
              Void
            </Menu.Item>
          </Menu.List>
        </>
      )}
    </Menu>
  )
}
