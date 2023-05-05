import { CardHeader } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { ToggleCard, ToggleCardProps } from './ToggleCard'

interface CompletionCsvCardProps extends ToggleCardProps {
  onCompletion?: () => void
}

export const CompletionCsvCard = ({
  onCompletion,
  ...toggleCardProps
}: CompletionCsvCardProps) => (
  <ToggleCard {...toggleCardProps}>
    <CardHeader>400 letters generated</CardHeader>
    <Button onClick={onCompletion}>Completed</Button>
  </ToggleCard>
)
