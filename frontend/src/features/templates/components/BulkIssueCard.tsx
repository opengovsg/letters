import { Flex, Spacer, VStack } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { ReactNode } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'

import { BulkLetterIssueFormState } from './states/BulkLetterIssueFormState'

interface BulkIssueCardButtonConfig {
  nextButtonLabel: string
  isNextButtonDisabled?: boolean
  isNextLoading?: boolean
}

interface BulkIssueCardProps {
  children?: ReactNode
  shouldDisplay: boolean
  handlePreviousClick?: () => void
  handleNextClick: () => void
  buttonConfig: BulkIssueCardButtonConfig
}
export const BulkIssueCard = ({
  children,
  handleNextClick,
  handlePreviousClick,
  shouldDisplay,
  buttonConfig,
}: BulkIssueCardProps): JSX.Element => {
  const methods = useFormContext<BulkLetterIssueFormState>()
  const { nextButtonLabel, isNextButtonDisabled, isNextLoading } = buttonConfig
  return shouldDisplay ? (
    <FormProvider {...methods}>
      <VStack
        align={'left'}
        width={'27%'}
        backgroundColor="white"
        padding={'24px'}
      >
        {children}
      </VStack>
      <Flex
        paddingBottom="32px"
        paddingTop="16px"
        justify="space-between"
        width={'27%'}
      >
        {handlePreviousClick ? (
          <>
            <Button
              flex="1"
              alignSelf={'right'}
              variant={'outline'}
              onClick={() => {
                handlePreviousClick()
              }}
            >
              Previous{' '}
            </Button>
            <Spacer maxW="0.5rem" />
          </>
        ) : (
          <></>
        )}

        <Button
          flex="2"
          alignSelf={'right'}
          onClick={() => handleNextClick()}
          isDisabled={isNextButtonDisabled}
          isLoading={isNextLoading}
        >
          {nextButtonLabel}
        </Button>
      </Flex>
    </FormProvider>
  ) : (
    <></>
  )
}
