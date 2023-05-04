import { Box, ButtonGroup, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { Link } from 'react-router-dom'

export const WelcomePage = (): JSX.Element => {
  return (
    <VStack alignItems="left" spacing="0px">
      <VStack pt={16} spacing={8} align={'center'}>
        <Box>
          YOU ARE NOW ON THE PUBLIC PAGE OF THE APP. Replace this page with the
          root page of your application.
        </Box>
      </VStack>
    </VStack>
  )
}
