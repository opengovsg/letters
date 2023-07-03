import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
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
  GetBulkLetterDto,
} from '~shared/dtos/letters.dto'
import { arrToCsv } from '~utils/csvUtils'

interface UploadCsvFormProps {
  onSuccess: (res: GetBulkLetterDto[]) => void
  onError: (errors: BulkLetterValidationResultError[]) => void
  uploadCsvErrors: BulkLetterValidationResultError[]
  reset: () => void
}

export const UploadCsvForm = ({
  onSuccess,
  onError,
  uploadCsvErrors,
  reset,
}: UploadCsvFormProps): JSX.Element => {
  const [file, setFile] = useControllableState<File | undefined>({})
  const [isPasswordProtected, setIsPasswordProtected] = useState(false)

  const { parsedArr, parseCsv, error: parseCsvError, passwords } = useParseCsv()

  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)

  const [passwordInstructions, setPasswordInstructions] = useState('')

  const handlePasswordInstructionsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value
    setPasswordInstructions(inputValue)
  }

  const downloadSample = () => {
    const csvRows = isPasswordProtected
      ? [...template.fields, 'Password']
      : template.fields
    arrToCsv(`${template.name} Sample.csv`, csvRows)
  }

  const { mutateAsync, isLoading } = useCreateBulkLetterMutation({
    onSuccess,
    onError,
  })

  const handleSubmit = async (): Promise<void> => {
    const reqBody = isPasswordProtected
      ? {
          templateId,
          letterParamMaps: parsedArr,
          passwords,
          passwordInstructions,
        }
      : { templateId, letterParamMaps: parsedArr }
    await mutateAsync(reqBody)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordProtected(event.target.checked)
  }

  const getErrorMessage = (): string => {
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
    return ''
  }

  return (
    <FormControl
      isInvalid={
        !!parseCsvError ||
        uploadCsvErrors.length > 0 ||
        (file && passwords.length > 0 !== isPasswordProtected)
      }
    >
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
        <FormErrorMessage>{getErrorMessage()}</FormErrorMessage>
        <Flex justify="space-between">
          <Stack>
            <Text fontSize="24px" fontWeight="500">
              Add password protection
            </Text>
            {/* TODO: Add a link to password guidelines */}
            <Text fontSize="14px" fontWeight="400">
              Adds a csv field for password that citizens would have to add
              before accessing the letter. Password Guidelines{' '}
            </Text>
          </Stack>
          <Switch
            size="lg"
            colorScheme="green"
            onChange={handleChange}
            isChecked={isPasswordProtected}
          ></Switch>
        </Flex>
        {isPasswordProtected && (
          <Stack>
            <Text fontSize="18px" fontWeight="500">
              Password Information Callout (Optional)
            </Text>
            <Text fontSize="14px" fontWeight="400">
              Describe to citizens what information they can use to unlock their
              letter. E.g. — &quot; Use the last four digits of NRIC + DOB to
              unlock this letter &quot;
            </Text>
            <Input
              value={passwordInstructions}
              onChange={handlePasswordInstructionsChange}
              placeholder="Password information callout"
            />
          </Stack>
        )}
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
            isDisabled={
              !file ||
              !(parsedArr.length > 0) ||
              !!parseCsvError ||
              uploadCsvErrors.length > 0 ||
              isPasswordProtected !== passwords.length > 0
            }
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
