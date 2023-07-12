import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react'
import { IconButton } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as SaveIcon } from '~/assets/SaveIcon.svg'
import { routes } from '~constants/routes'
import { TemplateEditor } from '~features/editor/components/TemplateEditor'

import { CreateTemplateModal } from './components/CreateTemplateModal'

export const CreateTemplatePage = (): JSX.Element => {
  const navigate = useNavigate()
  const [templateContent, setTemplateContent] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box h="100%" display="flex" flexDirection="column">
      <HStack w="full" justify="space-between" px={2} py={6}>
        <HStack alignItems="center">
          <IconButton
            aria-label="back"
            variant="clear"
            icon={<BiLeftArrowAlt style={{ color: '#2C2E34' }} />}
            onClick={() => navigate(`/admin/${routes.admin.templates.index}`)}
            _hover={{ background: 'none' }}
            size="lg"
          />
          <Text as="h4" fontWeight="600" color="black" fontSize="1.4rem">
            New Template
          </Text>
        </HStack>
        <Button
          ml="auto"
          leftIcon={<SaveIcon />}
          onClick={onOpen}
          color="#005DEA"
          textColor="white"
        >
          Save Template
        </Button>
      </HStack>
      <TemplateEditor onContentChange={setTemplateContent} />
      <CreateTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        templateContent={templateContent}
      />
    </Box>
  )
}
