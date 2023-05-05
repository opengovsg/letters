import { CardHeader } from '@chakra-ui/react'

import { BulkIssueCard } from './BulkIssueCard'

export const CompletionCsvCard = (props: any) => (
  <BulkIssueCard {...props}>
    <CardHeader>400 letters generated</CardHeader>
  </BulkIssueCard>
)
