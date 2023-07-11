import { Spacer, Text, useDisclosure } from '@chakra-ui/react'

import { BulkIssueCard } from './BulkIssueCard'
import { BulkIssueSendLettersConfirmationModal } from './modals/BulkIssueSendLettersConfirmationModal'

interface BulkIssueSendLettersCardProps {
  shouldDisplay: boolean
  goToPrevious: () => void
  letterCount: number
}
export const BulkIssueSendLettersCard = ({
  shouldDisplay,
  letterCount,
  goToPrevious,
}: BulkIssueSendLettersCardProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSendLetters = () => {
    onOpen()
  }
  return (
    <BulkIssueCard
      shouldDisplay={shouldDisplay}
      handleNextClick={handleSendLetters}
      handlePreviousClick={goToPrevious}
      buttonConfig={{ nextButtonLabel: `Send ${letterCount} letter(s)` }}
    >
      <Text fontSize={'12px'}>SENDER ID</Text>
      <Text textStyle={'body-1'}>LetterSG</Text>
      <Spacer padding={'12px'} />
      <Text fontSize={'12px'}>BODY </Text>
      <Text textStyle={'body-1'}>
        You have received a letter from HDB issued by clement@hdb.gov.sg
      </Text>
      <Text textStyle={'body-1'}>{` {{letter_link}}`}</Text>
      <Text textStyle={'body-1'}>
        If you face issues viewing, write to letters@open.gov.sg.
      </Text>
      <BulkIssueSendLettersConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </BulkIssueCard>
  )
}
