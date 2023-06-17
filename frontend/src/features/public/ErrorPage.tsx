import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'

import NotFoundSvg from '~/assets/NotFound.svg'

export const ErrorPage = (): JSX.Element => {
  return (
    <Flex pt={8} justify="center" minHeight="100vh">
      <Box maxW="60%">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
        >
          <Image src={NotFoundSvg} aria-hidden w={{ base: '80%', md: '40%' }} />
          <VStack
            align="stretch"
            spacing={8}
            ml={{ base: 0, md: 8 }}
            maxW={360}
          >
            <Text textAlign="center">This link is not available.</Text>
            <Text textAlign="center">
              Please double check your link or contact the agency who has given
              you this link.
            </Text>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  )
}
