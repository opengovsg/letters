import { CardHeader } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { convertFieldToCsv } from '~features/CsvParser'

import { ToggleCard, ToggleCardProps } from './ToggleCard'

interface SampleCsvCardProps extends ToggleCardProps {
  onCompletion: () => void
  templateFields?: string[]
}

export const SampleCsvCard = ({
  onCompletion,
  ...toggleCardProps
}: SampleCsvCardProps) => {
  return (
    <ToggleCard {...toggleCardProps}>
      <CardHeader>Download the sample .CSV file</CardHeader>
      <Button
        onClick={() => {
          //TODO: Error handling if templateFields are null or templates
          convertFieldToCsv(toggleCardProps.templateFields)
          onCompletion()
        }}
      >
        Download
      </Button>
    </ToggleCard>
  )
}
