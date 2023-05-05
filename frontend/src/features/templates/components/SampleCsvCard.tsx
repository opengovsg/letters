import { CardHeader } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { ToggleCard, ToggleCardProps } from './ToggleCard'

interface SampleCsvCardProps extends ToggleCardProps {
  onCompletion?: () => void
}

export const SampleCsvCard = ({
  onCompletion,
  ...toggleCardProps
}: SampleCsvCardProps) => (
  <ToggleCard {...toggleCardProps}>
    <CardHeader>Download the sample .CSV file</CardHeader>
    <Button onClick={onCompletion}>Download</Button>
  </ToggleCard>
)
