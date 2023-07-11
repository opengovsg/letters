import {
  Button,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'

import LetterConfirmation from '~/assets/LetterConfirmation.svg'

interface BulkIssueSendLettersConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
}
export const BulkIssueSendLettersConfirmationModal = ({
  isOpen,
  onClose,
}: BulkIssueSendLettersConfirmationModalProps): JSX.Element => {
  return (
    <Modal
      size="sm"
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <Image maxW="100%" maxH="100%" src={LetterConfirmation} />
        <VStack margin="20px" alignItems={'left'}>
          <Text textStyle={'h6'} fontSize={'24px'}>
            Are you absolutely sure?
          </Text>
          <Text mb="1rem" fontSize={'16px'}>
            Sending SMS notifications is an irreversible action
          </Text>
        </VStack>
        <hr />
        <Flex marginLeft={'auto'} padding={'10px'}>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {' '}
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            Confirm & Send
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
