import {
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'

import { UploadCsvErrorsTable } from '~features/issue/BulkIssueDrawer/UploadCsvErrorsTable'
import { BulkLetterValidationResultError } from '~shared/dtos/letters.dto'

interface BulkIssueCsvErrorModalProps {
  isOpen: boolean
  onClose: () => void
  uploadCsvErrors: BulkLetterValidationResultError[]
}
export const BulkIssueCsvErrorModal = ({
  isOpen,
  onClose,
  uploadCsvErrors,
}: BulkIssueCsvErrorModalProps): JSX.Element => {
  return (
    <Modal
      size="md"
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent padding={'30px'}>
        <ModalCloseButton />
        <Text
          textStyle={'h5'}
          mt={'5px'}
        >{`${uploadCsvErrors.length} errors detected`}</Text>

        <UploadCsvErrorsTable
          uploadCsvErrors={uploadCsvErrors}
          onClose={onClose}
        />
      </ModalContent>
    </Modal>
  )
}
