import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { LetterViewer } from '~features/editor/components/LetterViewer'
import { useGetTemplateById } from '~features/issue/hooks/templates.hooks'

interface LetterPreviewModalProps {
  templateId: number
  isOpen: boolean
  onClose: () => void
}

export const LetterPreviewModal = ({
  templateId,
  isOpen,
  onClose,
}: LetterPreviewModalProps): JSX.Element => {
  const navigate = useNavigate()
  const { template, isTemplatesLoading } = useGetTemplateById(templateId)

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <VStack width={'100%'} padding={'24px'}>
          <Box padding={4} overflowY="auto">
            {/* paddingBottom height to account for sticky button */}
            <LetterViewer
              html={template?.html}
              isLoading={isTemplatesLoading}
            />
          </Box>
          <Flex justify="space-between" width={'95%'}>
            <Button flex="1" variant="ghost" mr={3} onClick={onClose}>
              {' '}
              Cancel
            </Button>
            <Button
              flex="2"
              colorScheme="blue"
              onClick={() => navigate(`${templateId}/issue`)}
            >
              Start Issuing Letters
            </Button>
          </Flex>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
