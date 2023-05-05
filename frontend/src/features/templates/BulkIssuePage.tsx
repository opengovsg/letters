import { Text, VStack } from '@chakra-ui/react'

import { useTemplateId } from './hooks/templates.hooks'
export const BulkIssuePage = (): JSX.Element => {
  const { templateId } = useTemplateId()
  return (
    <VStack alignItems="left" spacing="0px">
      <Text>{`This is the bulk upload page for ${templateId}`}</Text>
    </VStack>
  )
}
