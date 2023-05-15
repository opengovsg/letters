import { CardHeader } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { convertCsvStringToCsv } from '~/utils/CsvParser'

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
        isDisabled={!!templateFields && !!templateName}
        onClick={() => {
          if (templateFields && templateName) {
            convertCsvStringToCsv(templateName, templateFields)
            onCompletion()
          }
        }}
      >
        Download
      </Button>
    </ToggleCard>
  )
}
