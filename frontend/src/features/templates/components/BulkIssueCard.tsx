import { Card, Flex } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

export const BulkIssueCard: FC<PropsWithChildren> = ({ children, ...rest }) => {
  return (
    <Flex {...rest}>
      <Card minW="50vw" variant="outline">
        {children}
      </Card>
    </Flex>
  )
}
