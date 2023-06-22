import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Spacer,
  Stack,
  Text,
  useControllableState,
  VStack,
} from '@chakra-ui/react'
import { Attachment, Switch } from '@opengovsg/design-system-react'
import { useState } from 'react'

import { ReactComponent as CsvIcon } from '~/assets/CsvIcon.svg'
import {
  useCreateBulkLetterMutation,
  useGetTemplateById,
  useTemplateId,
} from '~features/issue/hooks/templates.hooks'
import useParseCsv from '~features/issue/hooks/useParseCsv'
import {
  BulkLetterValidationResultError,
  CreateBulkLetterDto,
  GetBulkLetterDto,
} from '~shared/dtos/letters.dto'
import { arrToCsv } from '~utils/csvUtils'

interface UploadCsvFormProps {
  onSuccess: (res: GetBulkLetterDto[]) => void
  onError: (errors: BulkLetterValidationResultError[]) => void
  uploadCsvErrors: BulkLetterValidationResultError[]
  reset: () => void
}

function getRequiredFields(fields: [boolean, string][]): string[] {
  return fields
    .filter(([isRequired]) => isRequired)
    .map(([, fieldName]) => fieldName)
}

function getRequiredRequestParameters(
  parameters: [boolean, string[], string][],
): { [string: string]: string[] } {
  return parameters
    .filter(([isRequired]) => isRequired)
    .reduce(
      (paramObj, [, fields, fieldName]) => ({
        ...paramObj,
        [fieldName]: fields,
      }),
      {},
    )
}

function getErrorMessagesForMismatchedFields(
  fields: [boolean, string[], string, string][],
): string[] {
  const errors: string[] = []
  for (const field of fields) {
    const [isSelected, provided, columnName, feature] = field
    if (!isSelected && provided.length > 0) {
      errors.push(
        `${columnName} field found in the CSV file despite ${feature} disabled, please upload an updated .csv`,
      )
    }
    if (isSelected && provided.length === 0) {
      errors.push(
        `No ${columnName} field found in the CSV file despite ${feature} enabled, please upload an updated .csv`,
      )
    }
  }
  return errors
}

export const PASSWORD_KEY = 'Password'
export const PHONENUMBER_KEY = 'Phone Number'

export const UploadCsvForm = ({
  onSuccess,
  onError,
  uploadCsvErrors,
  reset,
}: UploadCsvFormProps): JSX.Element => {
  const [file, setFile] = useControllableState<File | undefined>({})
  const [isPasswordProtected, setIsPasswordProtected] = useState(false)
  const [isSendViaSms, setIsSendViaSms] = useState(false)

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

  const { mutateAsync, isLoading } = useCreateBulkLetterMutation({
    onSuccess,
    onError,
  })

  const handleSubmit = async (): Promise<void> => {
    const reqBody: CreateBulkLetterDto = {
      templateId,
      letterParamMaps: parsedArr,
      ...getRequiredRequestParameters([
        [isPasswordProtected, passwords, 'passwords'],
        [isSendViaSms, phoneNumbers, 'phoneNumbers'],
      ]),
    }

    await mutateAsync(reqBody)
  }

  const getFormErrorMessages = (): string[] => {
    if (!file) return []
    if (parseCsvError) {
      return [parseCsvError]
    }
    if (uploadCsvErrors.length > 0) {
      return ['Please correct the errors in the CSV file before proceeding']
    }

    return getErrorMessagesForMismatchedFields([
      [isPasswordProtected, passwords, PASSWORD_KEY, 'Password protection'],
      [isSendViaSms, phoneNumbers, PHONENUMBER_KEY, 'SMS sending'],
    ])
  }

  const isFormValid = () => {
    return (
      parsedArr.length > 0 &&
      parseCsvError.length === 0 &&
      uploadCsvErrors.length === 0 &&
      isPasswordProtected === passwords.length > 0 &&
      isSendViaSms === phoneNumbers.length > 0
    )
  }

  return (
    <FormControl isInvalid={!isFormValid()}>
      <VStack spacing={4} align="stretch">
        <Heading size="sm">Upload the completed .CSV file</Heading>
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
              reset()
              setFile(file)
              void parseCsv(file)
            }}
            accept={'.csv'}
            value={file}
            name={'fileInput'}
            isInvalid={!!parseCsvError || uploadCsvErrors.length > 0}
          />
        </VStack>
        {getFormErrorMessages().map((error) => (
          <FormErrorMessage key={error}>{error}</FormErrorMessage>
        ))}
        <Flex justify="space-between">
          <Stack>
            <Text fontSize="24px" fontWeight="500">
              Add password protection
            </Text>
            <Text fontSize="14px" fontWeight="400">
              Create password that citizens would have to add before accessing
              the letter.
            </Text>
          </Stack>
          <Switch
            size="lg"
            colorScheme="green"
            onChange={(e) => setIsPasswordProtected(e.target.checked)}
            isChecked={isPasswordProtected}
          ></Switch>
        </Flex>
        <Flex justify="space-between">
          <Stack>
            <Text fontSize="24px" fontWeight="500">
              Send via SMS
            </Text>
            <Text fontSize="14px" fontWeight="400">
              Send the letter via SMS by including the phone numbers in the CSV
            </Text>
          </Stack>
          <Switch
            size="lg"
            colorScheme="green"
            onChange={() => setIsSendViaSms(!isSendViaSms)}
            isChecked={isSendViaSms}
          ></Switch>
        </Flex>
        <Spacer />
        <Flex justify="space-between">
          <Button
            flex="1"
            variant="outline"
            isDisabled={!template?.name || !template?.fields}
            onClick={downloadSample}
          >
            Download Sample CSV
          </Button>
          <Spacer maxW="0.5rem" />
          <Button
            flex="1"
            isDisabled={!file || !isFormValid()}
            isLoading={isLoading}
            type="submit"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit}
          >
            Generate Letters
          </Button>
        </Flex>
      </VStack>
    </FormControl>
  )
}
