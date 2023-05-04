import {
  Avatar,
  Divider,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { BiChevronDown, BiChevronUp, BiLogOutCircle } from 'react-icons/bi'

import { useAdminAuth } from '~features/auth/context/AdminProtectedContext'
import { USER_GUIDE } from '~shared/constants/links'

import { NavMenuItem } from './NavMenuItem'

export const UserMenu = () => {
  const { adminUser, logout } = useAdminAuth()

  return (
    <Menu isLazy>
      {({ isOpen }) => (
        <>
          <MenuButton name="menu-button">
            <HStack spacing={1} alignItems="center">
              <Avatar
                w="30px"
                h="30px"
                name={adminUser?.email}
                getInitials={(name) => name.charAt(0)}
              />
              <Icon
                fontSize="1.5rem"
                as={isOpen ? BiChevronUp : BiChevronDown}
              />
            </HStack>
          </MenuButton>

          <MenuList py={0} fontSize="sm">
            <NavMenuItem closeOnSelect={false}>
              <Text userSelect="text">{adminUser?.email}</Text>
            </NavMenuItem>
            <Divider />
            <NavMenuItem icon={AiOutlineQuestionCircle} href={USER_GUIDE}>
              Get Help
            </NavMenuItem>
            <Divider />
            <NavMenuItem icon={BiLogOutCircle} onClick={() => logout()}>
              Logout
            </NavMenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}
