import { VStack } from '@chakra-ui/react'
import { useSteps } from '@chakra-ui/stepper'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
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
  const methods = useForm<BulkLetterIssueFormState>()

  const notificationMethod = methods.getValues('notificationMethod')

  const [bulkLetters, setBulkLetters] = useState<GetBulkLetterDto[]>([])

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
              setBulkLetters(letters)
            }}
            shouldDisplay={activeStep === 1}
            goToNext={() => goToNext()}
            goToPrevious={() => goToPrevious()}
          />
          {notificationMethod === CitizenNotificationMethod.SMS ? (
            <BulkIssueSendLettersCard
              shouldDisplay={activeStep === 2}
              goToPrevious={() => goToPrevious()}
            />
          ) : (
            <BulkIssueCompletionCard
              shouldDisplay={activeStep === 2}
              bulkLetters={bulkLetters}
            />
          )}
        </VStack>
      </VStack>
    </FormProvider>
  )
}
