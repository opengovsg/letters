import {
  BiChevronDown,
  BiChevronUp,
  BiDuplicate,
  BiShow,
  BiTrash,
} from 'react-icons/bi'
import { ButtonGroup, MenuButton, MenuDivider } from '@chakra-ui/react'

import Button from '~components/Button'
import IconButton from '~components/IconButton'
import Menu from '~components/Menu'

import { RowActionsProps } from './RowActions'
import { useRowActionDropdown } from './useRowActionDropdown'

export const RowActionsDropdown = ({
  isDisabled,
  templateId,
}: RowActionsProps): JSX.Element => {
  const {
    handleUseTemplate,
    handleEditTemplate,
    handlePreviewTemplate,
    handleDeleteTemplate,
  } = useRowActionDropdown(templateId)

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
            <Button px="1.5rem" mr="-1px" onClick={handleUseTemplate}>
              Use
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
              onClick={handlePreviewTemplate}
              icon={<BiShow fontSize="1.25rem" />}
            >
              Preview
            </Menu.Item>
            <Menu.Item
              onClick={handleEditTemplate}
              icon={<BiDuplicate fontSize="1.25rem" />}
            >
              Edit
            </Menu.Item>
            <MenuDivider />
            <Menu.Item
              onClick={handleDeleteTemplate}
              color="danger.500"
              icon={<BiTrash fontSize="1.25rem" />}
            >
              Delete
            </Menu.Item>
          </Menu.List>
        </>
      )}
    </Menu>
  )
}
