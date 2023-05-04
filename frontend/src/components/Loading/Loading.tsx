import { Flex, Spinner } from '@chakra-ui/react'

export const Loading = ({ fullscreen = false }: { fullscreen?: boolean }) => (
  <Flex
    w="full"
    h={fullscreen ? '100vh' : 200}
    justify="center"
    align="center"
    background="white"
    rounded="md"
    boxShadow="xs"
  >
    <Spinner />
  </Flex>
)
