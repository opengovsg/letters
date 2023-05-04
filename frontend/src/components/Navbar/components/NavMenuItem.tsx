import { MenuItem, MenuItemProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface NavMenuItemProps extends Omit<MenuItemProps, 'icon'> {
  icon?: IconType
  onClick?: () => any
  href?: string
}

export const NavMenuItem = ({
  icon: Icon,
  onClick,
  children,
  href,
  ...rest
}: NavMenuItemProps): JSX.Element => {
  return (
    <MenuItem
      icon={Icon ? <Icon fontSize="1.25em" /> : undefined}
      onClick={onClick}
      minW="280px"
      _focus={{}}
      _hover={{}}
      _active={{}}
      cursor={onClick ?? href ? 'pointer' : 'unset'}
      as={href ? 'a' : undefined}
      href={href}
      target="_blank"
      {...rest}
    >
      {children || ''}
    </MenuItem>
  )
}
