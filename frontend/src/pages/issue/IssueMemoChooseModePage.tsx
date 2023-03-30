import { ReactElement, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { InfoCircle } from '@styled-icons/boxicons-regular'
import { Close, Description, FileCopy } from '@styled-icons/material'
import { StyledIcon } from '@styled-icons/styled-icon'

import { textStyles } from '~theme/textStyles'
import { DASHBOARD_ROUTE } from '~constants/routes'
import { useTemplate } from '~hooks/useTemplate'

export const IssueMemoChooseModePage = (): ReactElement => {
  const navigate = useNavigate()
  const { templateId } = useParams()

  // Verify that the template exists
  const { isLoading, isError, data: template } = useTemplate(Number(templateId))

  // Local state
  const [selectedMode, setSelectedMode] = useState<
    undefined | 'single' | 'bulk'
  >(undefined)

  // Event handlers
  const handleModeChange = (mode: typeof selectedMode) => {
    setSelectedMode(mode)
  }

  const handleContinueClick = () => {
    selectedMode === 'single'
      ? navigate(`/issue/${templateId}/single`)
      : navigate(`/issue/${templateId}/bulk/download`)
  }

  const buttonData: {
    mode: typeof selectedMode
    icon: StyledIcon
    title: string
    subtitle: string
    description: string
  }[] = [
    {
      mode: 'single',
      icon: Description,
      title: 'Generate Once',
      subtitle: 'Specific to only 1 user',
      description: '• Enter fields required',
    },
    {
      mode: 'bulk',
      icon: FileCopy,
      title: 'Bulk Generate',
      subtitle: 'For multiple users',
      description: '• Upload CSV with the fields required',
    },
  ]

  return (
    <Box w="100%" maxW="48em" margin="0 auto" textAlign="center" py="32" px="8">
      {isLoading && <Spinner />}
      {isError && <Navigate to={DASHBOARD_ROUTE} />}
      {template && (
        <Box color="gray.600">
          <Heading as="h1" {...textStyles.h2} mb="1">
            Generate Memo
          </Heading>
          <Text mb="16">
            Select if you would like to generate one or multiple memos to
            different people.
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap="4" mb="16">
            {buttonData.map(({ mode, icon, title, subtitle, description }) => (
              <GridItem
                border="2px solid"
                borderRadius="4"
                borderColor={selectedMode === mode ? 'orange.500' : 'gray.200'}
                px="4"
                py="8"
                colSpan={{ base: 2, md: 1 }}
                onClick={() => handleModeChange(mode)}
                cursor="pointer"
                key={mode}
              >
                <Icon as={icon} w="16" h="auto" mb="2" />
                <Text {...textStyles.h3}>{title}</Text>
                <Text mb="4">{subtitle}</Text>
                <Text color="gray.400">{description}</Text>
              </GridItem>
            ))}
          </Grid>

          <Flex
            w="100%"
            backgroundColor="gray.50"
            p="4"
            mb="4"
            textAlign="left"
          >
            <Icon as={InfoCircle} w="6" h="6" mr="2" />
            <Text>
              Generating a memo requires the recipient's NRIC to be entered at
              the next step, even if it won't be displayed, or wasn't included
              in the template.
            </Text>
          </Flex>
          <Button
            disabled={!selectedMode}
            isFullWidth
            onClick={handleContinueClick}
          >
            Continue
          </Button>

          <Link to={DASHBOARD_ROUTE}>
            <Icon
              as={Close}
              w="8"
              h="auto"
              color="gray.400"
              position="absolute"
              top="4"
              right="4"
            />
          </Link>
        </Box>
      )}
    </Box>
  )
}
