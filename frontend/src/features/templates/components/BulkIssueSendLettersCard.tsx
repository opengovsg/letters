import { Spacer, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import { useCreateBulkLetterMutation } from '~features/issue/hooks/templates.hooks'
import {
  BulkLetterValidationResultError,
  CreateBulkLetterDto,
  GetBulkLetterDto,
} from '~shared/dtos/letters.dto'

import { BulkIssueCard } from './BulkIssueCard'
import { BulkIssueSendLettersConfirmationModal } from './modals/BulkIssueSendLettersConfirmationModal'

interface BulkIssueSendLettersCardProps {
  shouldDisplay: boolean
  goToPrevious: () => void
  onSuccess: (res: GetBulkLetterDto[]) => void
}
export const BulkIssueSendLettersCard = ({
  shouldDisplay,
  goToPrevious,
  onSuccess,
}: BulkIssueSendLettersCardProps): JSX.Element => {
  const navigate = useNavigate()
  const { getValues } = useFormContext()

  const letterCount = (
    getValues('letterGenerationObject') as CreateBulkLetterDto
  )?.phoneNumbers?.length

  const [uploadCsvErrors, setUploadCsvErrors] = useState<
    BulkLetterValidationResultError[]
  >([])

  const onError = (errors: BulkLetterValidationResultError[]) => {
    setUploadCsvErrors(errors)
  }
  const { mutateAsync } = useCreateBulkLetterMutation({
    onSuccess,
    onError,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onConfirmSendLetters = async (): Promise<void> => {
    const reqBody = getValues('letterGenerationObject') as CreateBulkLetterDto

    await mutateAsync(reqBody)
    if (!uploadCsvErrors?.length) {
      navigate(`/${routes.admin.index}/${routes.admin.templates}`)
    }
  }

  return (
    <BulkIssueCard
      shouldDisplay={shouldDisplay}
      handleNextClick={onOpen}
      handlePreviousClick={goToPrevious}
      buttonConfig={{ nextButtonLabel: `Send ${letterCount ?? 0} letter(s)` }}
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirmSendLetters={onConfirmSendLetters}
      />
    </BulkIssueCard>
  )
}
