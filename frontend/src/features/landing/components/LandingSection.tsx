import { Flex, FlexProps } from '@chakra-ui/react'
import { FC } from 'react'

export const LandingSection: FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex
      px={{ base: '1.5rem', md: '4.5rem', lg: '8rem' }}
      pt={{ base: '3.5rem', md: '5.5rem' }}
      pb={{ base: '3.5rem', md: '5.5rem' }}
      flexDir="column"
      {...props}
    >
      {children}
    </Flex>
  )
}
