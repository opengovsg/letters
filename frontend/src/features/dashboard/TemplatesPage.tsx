import { Box, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as PlusCircle } from '~/assets/PlusCircle.svg'
import { routes } from '~constants/routes'

import { TemplatesBody } from './components/TemplatesBody'

export const TemplatesPage = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <VStack alignItems="left" spacing="0px">
      <VStack pt={2.5} pl={8} spacing={8} align={'center'}>
        <Button
          alignSelf="start"
          leftIcon={<PlusCircle />}
          onClick={() => navigate(`/admin/${routes.admin.create}`)}
        >
          Add New
        </Button>
        <Box>
          <TemplatesBody />
        </Box>
      </VStack>
    </VStack>
  )
}
