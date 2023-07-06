import { Box, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { Link, useNavigate } from 'react-router-dom'

import { TemplatesBody } from './components/TemplatesBody'

export const TemplatesPage = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <VStack alignItems="left" spacing="0px">
      <VStack pt={2.5} align={'start'}>
        <Link to="https://go.gov.sg/letters-beta" target="_blank">
          <Button marginLeft={8} alignSelf="start">
            Request New Template
          </Button>
        </Link>
        <Box>
          <TemplatesBody />
        </Box>
      </VStack>
    </VStack>
  )
}
