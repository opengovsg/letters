import { VStack } from '@chakra-ui/react'
import { useSteps } from '@chakra-ui/stepper'
import { useToast } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import {
  BulkLetterValidationResultError,
  CitizenNotificationMethod,
  GetBulkLetterDto,
} from '~shared/dtos/letters.dto'

import { BulkIssueCompletionCard } from './components/BulkIssueCompletionCard'
import { BulkIssueSendLettersCard } from './components/BulkIssueSendLettersCard'
import { BulkIssueSettingsCard } from './components/BulkIssueSettingsCard'
import { BulkIssueUploadCsvCard } from './components/BulkIssueUploadCsvCard'
import { BulkLetterIssueFormState } from './components/states/BulkLetterIssueFormState'
import { TemplateHeader } from './components/TemplateHeader'

export const BulkIssuePage = (): JSX.Element => {
  const navigate = useNavigate()

  const methods = useForm<BulkLetterIssueFormState>()

  const toast = useToast({
    status: 'success',
  })

  const notificationMethod = methods.getValues('notificationMethod')

  const [uploadCsvErrors, setUploadCsvErrors] = useState<
    BulkLetterValidationResultError[]
  >([])

  const [bulkLetters, setBulkLetters] = useState<GetBulkLetterDto[]>([])

  const onClose = () =>
    navigate(`/${routes.admin.index}/${routes.admin.templates}`)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { activeStep, goToNext, goToPrevious } = useSteps()

  return (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <FormProvider {...methods}>
      <VStack alignItems="left" spacing="0px" h="100%">
        <TemplateHeader activeStep={activeStep} />
        <VStack pt={10} align={'center'} backgroundColor={'grey.50'} h="100%">
          <BulkIssueSettingsCard
            shouldDisplay={activeStep === 0}
            goToNext={() => goToNext()}
          />

          <BulkIssueUploadCsvCard
            onSuccess={(letters: GetBulkLetterDto[]) => {
              setUploadCsvErrors([])
              setBulkLetters(letters)
            }}
            shouldDisplay={activeStep === 1}
            uploadCsvErrors={uploadCsvErrors}
            goToNext={() => goToNext()}
            goToPrevious={() => goToPrevious()}
          />
          {notificationMethod === CitizenNotificationMethod.SMS ? (
            <BulkIssueSendLettersCard
              shouldDisplay={activeStep === 2}
              goToPrevious={() => goToPrevious()}
              onSuccess={(letters: GetBulkLetterDto[]) => {
                setUploadCsvErrors([])
                setBulkLetters(letters)
                toast({
                  description: 'Letters sent successfully!',
                  isClosable: true,
                  position: 'bottom',
                })
              }}
            />
          ) : (
            <BulkIssueCompletionCard
              shouldDisplay={activeStep === 2}
              bulkLetters={bulkLetters}
              onDownload={() => {
                onClose()
              }}
              goToPrevious={() => goToPrevious()}
            />
          )}
        </VStack>
      </VStack>
    </FormProvider>
  )
}
