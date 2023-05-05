import { CardHeader } from '@chakra-ui/react'

import { BulkIssueCard } from './BulkIssueCard'

export const UploadCsvCard = (props: any) => (
  <BulkIssueCard {...props}>
    <CardHeader>Upload the completed .CSV file</CardHeader>
  </BulkIssueCard>
)
