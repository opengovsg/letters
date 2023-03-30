import { ReactElement } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Copy, Download } from '@styled-icons/boxicons-regular'
import { Close } from '@styled-icons/material'

import { textStyles } from '~theme/textStyles'
import { DASHBOARD_ROUTE } from '~constants/routes'

export const IssueSingleMemoSuccessPage = (): ReactElement => {
  const toast = useToast()

  const [searchParams] = useSearchParams()
  const slug = searchParams.get('slug')

  const handleCopyWeblink = async () => {
    const { protocol, hostname, port } = new URL(window.location.href)
    await navigator.clipboard.writeText(
      port
        ? `${protocol}//${hostname}:${port}/p/${slug}`
        : `${protocol}//${hostname}/p/${slug}`,
    )

    toast({
      title: 'Weblink copied to clipboard',
      position: 'top',
      status: 'success',
    })
  }

  const handleGenerateQR = () => {
    console.log('generate QR button clicked')
  }

  return (
    <Box w="100%" maxW="48em" margin="0 auto" textAlign="center" py="32" px="8">
      {!slug && <Navigate to={DASHBOARD_ROUTE} />}

      <Box color="gray.600">
        <Heading as="h1" {...textStyles.h2} mb="1">
          Generate Memos
        </Heading>
        <Text mb="16">Copy weblink or download QR code for memo</Text>

        <Grid templateColumns="repeat(2, 1fr)" gap="4" mb="16">
          <GridItem px="4" py="8" colSpan={{ base: 2, md: 1 }}>
            <Icon as={Copy} w="16" h="auto" mb="2" />
            <Text mb="4">Copy weblink for use</Text>
            <Button variant="outline" onClick={handleCopyWeblink}>
              Copy weblink
            </Button>
          </GridItem>

          <GridItem px="4" py="8" colSpan={{ base: 2, md: 1 }}>
            <Icon as={Download} w="16" h="auto" mb="2" />
            <Text mb="4">Download QR code for easy use</Text>
            <Button variant="outline" onClick={handleGenerateQR}>
              Download QR code
            </Button>
          </GridItem>
        </Grid>

        <Link to={DASHBOARD_ROUTE}>
          <Button isFullWidth>Return to dashboard</Button>
        </Link>

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
    </Box>
  )
}
