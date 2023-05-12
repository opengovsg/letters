import { HStack, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { BulkIssueButton } from './components/BulkIssueButton'
import { CompletionCsvCard } from './components/CompletionCsvCard'
import { SampleCsvCard } from './components/SampleCsvCard'
import { TemplateHeader } from './components/TemplateHeader'
import { UploadCsvCard } from './components/UploadCsvCard'
import { useGetTemplateById, useTemplateId } from './hooks/templates.hooks'
import { useCardIndex } from './hooks/useCardIndex'

export const BulkIssuePage = (): JSX.Element => {
  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)
  const navigate = useNavigate()

  const [currIndex, setCurrIndex, handleNext, handlePrev] = useCardIndex(0)

  const steps = [
    'Download .CSV file',
    'Upload completed .CSV file',
    'Send letters',
  ]

  return (
    <VStack alignItems="left" spacing="0px">
      <TemplateHeader templateName={template?.name} />
      <VStack pt={16} spacing={8} align={'center'}>
        <HStack spacing={8}>
          {steps.map((text, i) => (
            <BulkIssueButton
              key={i}
              onClick={() => setCurrIndex(i)}
              buttonIndex={i}
              currIndex={currIndex}
            >
              {text}
            </BulkIssueButton>
          ))}
        </HStack>
        <SampleCsvCard
          shouldDisplay={currIndex === 0}
          onCompletion={handleNext}
          templateFields={template?.fields}
        />
        <UploadCsvCard
          shouldDisplay={currIndex === 1}
          onCompletion={handleNext}
        />
        <CompletionCsvCard
          shouldDisplay={currIndex === 2}
          onCompletion={() => navigate('/admin/templates')}
        />
      </VStack>
    </VStack>
  )
}
