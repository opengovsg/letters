import { Box } from '@chakra-ui/react'

import { RowActionsDropdown } from './RowActionsDropdown'

export interface RowActionsProps {
  templateId: number
  isDisabled?: boolean
}

export const RowActions = (props: RowActionsProps): JSX.Element => {
  return (
    <Box
      pos="absolute"
      right="2em"
      top={{ md: '1.5rem' }}
      bottom={{ base: '1.5rem', md: 'initial' }}
    >
      <RowActionsDropdown {...props} />
    </Box>
  )
}
