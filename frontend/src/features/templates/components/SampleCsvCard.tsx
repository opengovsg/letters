import { CardHeader } from '@chakra-ui/react'

import { BulkIssueCard } from './BulkIssueCard'

export const SampleCsvCard = (props: any) => (
  <BulkIssueCard {...props}>
    <CardHeader>Download the sample .CSV file</CardHeader>
  </BulkIssueCard>
)
