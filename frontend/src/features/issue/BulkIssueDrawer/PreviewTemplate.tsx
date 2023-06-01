import { Box, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { Editor } from '~features/tinymce/components/Editor'

import { useGetTemplateById, useTemplateId } from '../hooks/templates.hooks'

interface PreviewTemplateProps {
  onToggle: () => void
}

export const PreviewTemplate = ({
  onToggle,
}: PreviewTemplateProps): JSX.Element => {
  const { templateId } = useTemplateId()
  const { template, isTemplatesLoading } = useGetTemplateById(templateId)
  return (
    <VStack spacing={8} alignItems="center" justifyContent="center">
      <Box w="85%">
        <Editor html={template?.html} isLoading={isTemplatesLoading} />
      </Box>
      <Button w="full" onClick={onToggle}>
        Issue letter
      </Button>
    </VStack>
  )
}
