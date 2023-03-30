import { Stack, Text } from '@chakra-ui/react'

export interface MemoHeaderProps {
  isLoading: boolean
}

/**
 * Header for listing number of forms, or updating the sort order of listed forms, etc.
 */
export const MemoHeader = ({ isLoading }: MemoHeaderProps): JSX.Element => {
  return (
    <Stack
      justify="space-between"
      direction={{ base: 'column', md: 'row' }}
      align={{ base: 'flex-start', md: 'center' }}
      spacing="1rem"
    >
      <Text
        flex={1}
        as="h2"
        textStyle="h2"
        display="flex"
        color="secondary.500"
      >
        Issued by You
      </Text>
    </Stack>
  )
}
