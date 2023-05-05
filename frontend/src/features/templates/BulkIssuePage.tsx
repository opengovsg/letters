import { Text, VStack } from '@chakra-ui/react'

import { TemplateHeader } from './components/TemplateHeader'
import { useGetTemplateById, useTemplateId } from './hooks/templates.hooks'

export const BulkIssuePage = (): JSX.Element => {
  const { templateId } = useTemplateId()
  const { name } = useGetTemplateById(templateId)

  return (
    <VStack alignItems="left" spacing="0px">
      <TemplateHeader templateName={name} />
    </VStack>
  )
}
