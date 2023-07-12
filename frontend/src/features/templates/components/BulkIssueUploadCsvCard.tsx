import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Link,
  Text,
  UnorderedList,
  useControllableState,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Attachment, Button } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdError, MdFileDownload } from 'react-icons/md'

import { ReactComponent as CsvIcon } from '~/assets/CsvIcon.svg'
import {
  useCreateBulkLetterMutation,
  useGetTemplateById,
  useTemplateId,
  useValidateBulkLetterMutation,
} from '~features/issue/hooks/templates.hooks'
import useParseCsv from '~features/issue/hooks/useParseCsv'
import {
  BulkLetterValidationResultError,
  CitizenNotificationMethod,
  CreateBulkLetterDto,
  GetBulkLetterDto,
} from '~shared/dtos/letters.dto'
import { arrToCsv } from '~utils/csvUtils'
import { pluraliseIfNeeded } from '~utils/stringUtils'

import { BulkIssueCard } from './BulkIssueCard'
import { BulkIssueCsvErrorModal } from './modals/BulkIssueCsvErrorModal'
import { BulkLetterIssueFormState } from './states/BulkLetterIssueFormState'

interface BulkIssueUploadCsvCardProps {
  onSuccess: (res: GetBulkLetterDto[]) => void
  shouldDisplay: boolean
  goToNext: () => void
  goToPrevious: () => void
}

function getRequiredFields(fields: [boolean, string][]): string[] {
  return fields
    .filter(([isRequired]) => isRequired)
    .map(([, fieldName]) => fieldName)
}

export const PASSWORD_KEY = 'Password'
export const PHONENUMBER_KEY = 'Phone Number'

export const BulkIssueUploadCsvCard = ({
  onSuccess,
  shouldDisplay,
  goToNext,
  goToPrevious,
}: BulkIssueUploadCsvCardProps): JSX.Element => {
  const [file, setFile] = useControllableState<File | undefined>({})

  const { getValues, setValue } = useFormContext<BulkLetterIssueFormState>()
  const isPasswordProtected = getValues('isPasswordProtected')
  const notificationMethod = getValues('notificationMethod')
  const passwordInstructions = getValues('passwordInstructions')

  const isSendViaSms = notificationMethod === CitizenNotificationMethod.SMS

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    parsedArr,
    parseCsv,
    error: parseCsvError,
    passwords,
    phoneNumbers,
  } = useParseCsv()

  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)

  const downloadSample = () => {
    const csvRows: string[] = [
      ...template.fields,
      ...getRequiredFields([
        [isPasswordProtected, PASSWORD_KEY],
        [isSendViaSms, PHONENUMBER_KEY],
      ]),
    ]

    arrToCsv(`${template.name} Sample.csv`, csvRows)
  }

  const [uploadCsvErrors, setUploadCsvErrors] = useState<
    BulkLetterValidationResultError[]
  >([])

  const onError = (errors: BulkLetterValidationResultError[]) => {
    setUploadCsvErrors(errors)
  }

  const { mutateAsync, isLoading } = useCreateBulkLetterMutation({
    onSuccess,
    onError,
  })

  const { mutateAsync: validate } = useValidateBulkLetterMutation({
    onError,
  })

  const handleSubmit = async (): Promise<void> => {
    const reqBody: CreateBulkLetterDto = {
      templateId,
      letterParamMaps: parsedArr,
    }
    if (isPasswordProtected) {
      reqBody.passwords = passwords
      reqBody.passwordInstructions = passwordInstructions
    }
    if (isSendViaSms) {
      reqBody.phoneNumbers = phoneNumbers
      await validate(reqBody)
    }
    setValue('letterGenerationObject', reqBody)

    if (!isSendViaSms) {
      await mutateAsync(reqBody)
    }
    goToNext()
  }

  const getErrorMessage = (): string => {
    // place this here, since officers might input the password instructions before uploading the CSV file
    // they wouldn't be able to see the error, if this condition is placed below the empty file condition
    if (!file) return ''
    if (parseCsvError) {
      return parseCsvError
    }
    if (!isPasswordProtected && passwords.length > 0) {
      return 'Password field found in the CSV file despite Password protection disabled, please upload an updated .csv'
    }
    if (isPasswordProtected && passwords.length === 0) {
      return 'No Password field found in the CSV file despite Password protection enabled, please upload an updated .csv'
    }
    if (!isSendViaSms && phoneNumbers.length > 0) {
      return 'Phone number field found in the CSV file despite Password protection disabled, please upload an updated .csv'
    }
    if (isSendViaSms && phoneNumbers.length === 0) {
      return 'No Phone number field found in the CSV file despite Password protection enabled, please upload an updated .csv'
    }
    return ''
  }

  const csvFormError =
    !!parseCsvError ||
    uploadCsvErrors.length > 0 ||
    isPasswordProtected === (passwords.length === 0) ||
    isSendViaSms === (phoneNumbers.length === 0)

  const passwordInstructionsError =
    isPasswordProtected &&
    passwordInstructions &&
    passwordInstructions.length < 10

  return (
    <BulkIssueCard
      shouldDisplay={shouldDisplay}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleNextClick={handleSubmit}
      buttonConfig={{
        isNextButtonDisabled:
          !file || csvFormError || passwordInstructionsError || false,
        isNextLoading: isLoading,
        nextButtonLabel: 'Upload File',
      }}
      handlePreviousClick={() => goToPrevious()}
    >
      <FormControl
        isInvalid={csvFormError || passwordInstructionsError || false}
      >
        <VStack spacing={4} align="stretch">
          <Text textStyle="h6">Upload the completed .CSV file</Text>
          <Text textStyle="body-2">
            CSV file must include:
            <UnorderedList padding={'5px'}>
              <li>All placeholders in the template</li>
              {isSendViaSms && (
                <li>
                  A phone number column with the recipient&apos;s phone number
                </li>
              )}
              {isPasswordProtected && (
                <li>
                  A &quot;Password&quot; column with the password to view letter
                </li>
              )}
            </UnorderedList>
          </Text>

          <Link onClick={downloadSample} variant={'standalone'}>
            <HStack>
              <Icon as={MdFileDownload} />
              <Text textStyle={'subhead-1'}> Download Sample</Text>
            </HStack>
          </Link>

          <VStack align="stretch" spacing={0}>
            {file && (
              <Box
                bg="#F9F9F9"
                w="100%"
                height="150"
                color="black"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CsvIcon />
              </Box>
            )}
            <Attachment
              onChange={(file) => {
                setUploadCsvErrors([])
                setFile(file)
                void parseCsv(file)
              }}
              accept={'.csv'}
              value={file}
              name={'fileInput'}
              isInvalid={!!parseCsvError || uploadCsvErrors.length > 0}
            />
          </VStack>
          {csvFormError && (
            <FormErrorMessage>{getErrorMessage()}</FormErrorMessage>
          )}
          {uploadCsvErrors?.length ? (
            <Flex
              flexDir="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack>
                <MdError color="#C03434" size="1.5rem" />
                <Text textStyle="h5" textColor="utility.feedback.critical">
                  {uploadCsvErrors.length}{' '}
                  {pluraliseIfNeeded(uploadCsvErrors, 'error')} detected
                </Text>
              </HStack>

              <Button variant="clear" onClick={onOpen}>
                View
              </Button>
              <BulkIssueCsvErrorModal
                isOpen={isOpen}
                onClose={onClose}
                uploadCsvErrors={uploadCsvErrors}
              />
            </Flex>
          ) : (
            <></>
          )}
        </VStack>
      </FormControl>
    </BulkIssueCard>
  )
}
