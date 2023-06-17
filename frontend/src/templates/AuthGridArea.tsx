import { GridItem } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

export const AuthGridArea: FC<PropsWithChildren> = (
  { children },
  gridColumnLg: string,
) => (
  <GridItem
    gridColumn={{ base: '1 / 5', md: '2 / 12', lg: gridColumnLg }}
    py="4rem"
    display="flex"
    alignItems={{ base: 'initial', lg: 'center' }}
    justifyContent="center"
  >
    {children}
  </GridItem>
)
