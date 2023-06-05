import { FlexProps } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { FC, MouseEventHandler } from 'react'

export const IconButton: FC<FlexProps> = ({
  onClick,
  children,
}): JSX.Element => (
  <Button
    variant="clear"
    padding={0}
    minWidth={0}
    minHeight={0}
    color=""
    onClick={onClick as unknown as MouseEventHandler<HTMLButtonElement>}
  >
    {children}
  </Button>
)
