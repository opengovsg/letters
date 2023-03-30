import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Stack, Text, useBreakpointValue } from '@chakra-ui/react'

import { BUILDER_ROUTE } from '~constants/routes'
import Button from '~components/Button'

export interface TemplateHeaderProps {
  isLoading: boolean
}

/**
 * Header for listing number of forms, or updating the sort order of listed forms, etc.
 */
export const TemplateHeader = ({
  isLoading,
}: TemplateHeaderProps): JSX.Element => {
  const isMobile = useBreakpointValue({
    base: true,
    xs: true,
    md: false,
  })

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
        All Templates
      </Text>
      <Stack
        w={{ base: '100%', md: 'auto' }}
        spacing="1rem"
        direction={{ base: 'column', md: 'row' }}
        h="fit-content"
      >
        <Link to={BUILDER_ROUTE}>
          <Button
            isFullWidth={isMobile}
            isDisabled={isLoading}
            rightIcon={<BiPlus fontSize="1.5rem" />}
          >
            Create New
          </Button>
        </Link>
      </Stack>
    </Stack>
  )
}
