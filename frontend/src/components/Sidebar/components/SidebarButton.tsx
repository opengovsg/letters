import { Button, Text } from '@chakra-ui/react'

interface SidebarButtonProps {
  name: string
  onClick: () => void
  isSelected: boolean
}

export const SidebarButton = ({
  name,
  onClick,
  isSelected,
}: SidebarButtonProps): JSX.Element => (
  <Button
    w="full"
    key={name}
    variant="clear"
    textAlign="start"
    justifyContent="start"
    textColor={
      isSelected ? 'interaction.main.default' : 'interaction.support.unselected'
    }
    p={8}
    bgColor={isSelected ? 'interaction.main-subtle.default' : 'unset'}
    onClick={onClick}
  >
    <Text isTruncated>{name}</Text>
  </Button>
)
