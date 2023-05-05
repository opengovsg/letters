import { CardHeader } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { ToggleCard, ToggleCardProps } from './ToggleCard'

interface UploadCsvCardProps extends ToggleCardProps {
  onCompletion?: () => void
}

export const UploadCsvCard = ({
  onCompletion,
  ...toggleCardProps
}: UploadCsvCardProps) => (
  <ToggleCard {...toggleCardProps}>
    <CardHeader>Upload the completed .CSV file</CardHeader>
    <Button onClick={onCompletion}>Upload</Button>
  </ToggleCard>
)
