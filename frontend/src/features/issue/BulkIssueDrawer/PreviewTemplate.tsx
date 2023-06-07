import { Box, Flex, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'

import { LetterViewer } from '~features/editor/components/LetterViewer'

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
    <>
      <Box padding={8} flex="1" overflowY="auto" paddingBottom="6rem">
        {/* paddingBottom height to account for sticky button */}
        <LetterViewer html={template?.html} isLoading={isTemplatesLoading} />
      </Box>
      <Box
        position="fixed"
        bottom={0}
        background="white"
        paddingX={8}
        paddingY={4}
        borderTop="1px"
        width="100%"
        borderColor="gray.100"
      >
        <Button width="100%" onClick={onToggle}>
          Issue letter
        </Button>
      </Box>
    </>
  )
}
