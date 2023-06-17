import { GridItem } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

export const GenericNonMobileSidebarGridArea: FC<PropsWithChildren> = (
  { children },
  gridColumnLg: string,
) => (
  <GridItem
    display={{ base: 'none', md: 'flex' }}
    gridColumn={{ md: '2 / 12', lg: gridColumnLg }}
    h={{ md: '20.5rem', lg: 'auto' }}
    pt={{ base: '1.5rem', md: '2.5rem', lg: '3rem' }}
    pb={{ lg: '3rem' }}
    flexDir="column"
    alignItems={{ base: 'center', lg: 'start' }}
    justifyContent={{ base: 'start', lg: 'center' }}
  >
    {children}
  </GridItem>
)
