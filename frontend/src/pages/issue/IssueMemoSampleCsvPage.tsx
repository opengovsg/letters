import { ReactElement } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Download } from '@styled-icons/boxicons-regular'
import { Close } from '@styled-icons/material'
import download from 'downloadjs'

import { textStyles } from '~theme/textStyles'
import { DASHBOARD_ROUTE } from '~constants/routes'
import { useTemplate } from '~hooks/useTemplate'

import { UIN_TOKEN, UIN_TYPE_TOKEN } from './constants'

export const IssueMemoSampleCsvPage = (): ReactElement => {
  const navigate = useNavigate()
  const { templateId } = useParams()
  const toast = useToast()

  // Verify that the template exists
  const { isLoading, isError, data: template } = useTemplate(Number(templateId))

  const handleDownloadClick = async () => {
    try {
      let headers = template?.paramsRequired || []
      // Params from backend should not have UIN_TOKEN and UIN_TYPE_TOKEN
      headers = [UIN_TOKEN, UIN_TYPE_TOKEN, ...headers]
      /**
       * Escape `"` and `,`
       * Quotation marks are escaped with `\` in mustache,
       * but csv files escape quotation marks with another quotation mark:
       *  1. `\"` -> `""`
       * We can escape all `,` in the column header by wrapping the whole
       * thing with "":
       *  2. `header` -> `"${header}"`
       */
      const content = headers
        .map((h) => `"${h.replace(/\\"/g, '""')}"`)
        .join(',')

      download(content, `memos_sample.csv`, 'text/csv')
    } catch (e) {
      toast({
        title: `Failed to download CSV, please try refreshing`,
        position: 'top',
        status: 'error',
      })
      console.error(e)
    }
  }

  const handleContinueClick = () => {
    // Navigate away for now
    navigate(DASHBOARD_ROUTE)
    // navigate(`/issue/${templateId}/bulk/upload`)
  }

  return (
    <Box w="100%" maxW="48em" margin="0 auto" textAlign="center" py="32" px="8">
      {isLoading && <Spinner />}
      {isError && <Navigate to={DASHBOARD_ROUTE} />}
      {template && (
        <Box color="gray.600">
          <Heading as="h1" {...textStyles.h2} mb="1">
            Bulk Generate Memos
          </Heading>
          <Text mb="16">
            Download the CSV below, fill in the required fields and upload it
            again in the next page.
          </Text>

          <Center w="100%" bg="gray.50" p="4" mb="16">
            <VStack spacing="4">
              <Icon as={Download} w="12" h="12" />
              <Text>Download the CSV and fill in the required fields</Text>
              <Button variant="outline" onClick={handleDownloadClick}>
                Download CSV
              </Button>
            </VStack>
          </Center>

          <Button isFullWidth onClick={handleContinueClick}>
            Continue
          </Button>

          <Link to={`/issue/${templateId}`}>
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
