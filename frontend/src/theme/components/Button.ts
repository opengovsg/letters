/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentStyleConfig } from '@chakra-ui/react'
import { theme as ogpTheme } from '@opengovsg/design-system-react'

export const Button: ComponentStyleConfig = {
  ...ogpTheme.components.Button,
  defaultProps: {
    size: 'lg',
  },
}
