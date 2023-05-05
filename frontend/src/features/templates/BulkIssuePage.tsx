import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { CompletionCsvCard } from './components/CompletionCsvCard'
import { SampleCsvCard } from './components/SampleCsvCard'
import { TemplateHeader } from './components/TemplateHeader'
import { UploadCsvCard } from './components/UploadCsvCard'
import { useGetTemplateById, useTemplateId } from './hooks/templates.hooks'

export const BulkIssuePage = (): JSX.Element => {
  const { templateId } = useTemplateId()
  const { name } = useGetTemplateById(templateId)
  const sampleDisclosure = useDisclosure({ defaultIsOpen: true })
  const uploadDisclosure = useDisclosure()
  const completeDisclosure = useDisclosure()

  const toggleAction = (action: string) => {
    switch (action) {
      case 'sample':
        sampleDisclosure.onOpen()
        uploadDisclosure.onClose()
        completeDisclosure.onClose()
        break
      case 'upload':
        uploadDisclosure.onOpen()
        sampleDisclosure.onClose()
        completeDisclosure.onClose()
        break
      case 'complete':
        completeDisclosure.onOpen()
        uploadDisclosure.onClose()
        sampleDisclosure.onClose()
    }
  }

  return (
    <VStack alignItems="left" spacing="0px">
      <TemplateHeader templateName={name} />
      <VStack pt={16} spacing={8} align={'center'}>
        <HStack spacing={8}>
          <Button variant="link" onClick={() => toggleAction('sample')}>
            Download .CSV file
          </Button>
          <Text>{'>'}</Text>
          <Button variant="link" onClick={() => toggleAction('upload')}>
            Upload completed .CSV file
          </Button>
          <Text>{'>'}</Text>
          <Button variant="link" onClick={() => toggleAction('complete')}>
            Send letters
          </Button>
        </HStack>
        <SampleCsvCard {...sampleDisclosure.getDisclosureProps()} />
        <UploadCsvCard {...uploadDisclosure.getDisclosureProps()} />
        <CompletionCsvCard {...completeDisclosure.getDisclosureProps()} />
      </VStack>
    </VStack>
  )
}
