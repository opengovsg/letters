import { CardHeader } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { arrToCsv } from '~utils/csvUtils'

import { ToggleCard, ToggleCardProps } from './ToggleCard'

interface SampleCsvCardProps extends ToggleCardProps {
  onCompletion: () => void
  templateFields?: string[]
  templateName?: string
}

export const SampleCsvCard = ({
  onCompletion,
  templateFields,
  templateName,
  ...toggleCardProps
}: SampleCsvCardProps) => {
  return (
    <ToggleCard {...toggleCardProps}>
      <CardHeader>Download the sample .CSV file</CardHeader>
      <Button
        isDisabled={!templateFields || !templateName}
        onClick={() => {
          if (templateFields && templateName) {
            arrToCsv(`${templateName} Sample.csv`, templateFields)
            onCompletion()
          }
        }}
      >
        Download
      </Button>
    </ToggleCard>
  )
}
