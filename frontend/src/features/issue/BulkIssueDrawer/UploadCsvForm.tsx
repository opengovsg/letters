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
import { useToast } from '~hooks/useToast'
import {
  BulkLetterValidationResultError,
  GetBulkLetterDto,
} from '~shared/dtos/letters.dto'
import { arrToCsv } from '~utils/csvUtils'
import { pluraliseIfNeeded } from '~utils/stringUtils'

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

  const toast = useToast()
  const { parsedArr, parseCsv, error: parseCsvError, passwords } = useParseCsv()

  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)

  const downloadSample = () => {
    const csvRows = isPasswordProtected
      ? [...template.fields, 'Password']
      : template.fields
    arrToCsv(`${template.name} Sample.csv`, csvRows)
  }

  const { mutateAsync, isLoading } = useCreateBulkLetterMutation({
    onSuccess: (res: GetBulkLetterDto[]) => {
      onSuccess(res)
      toast({
        title: `${res.length} ${pluraliseIfNeeded(res, 'letter')} created`,
        status: 'success',
      })
    },
    onError,
  })

  const handleSubmit = async (): Promise<void> => {
    await mutateAsync({ templateId, letterParamMaps: parsedArr, passwords })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordProtected(event.target.checked)
  }

  const getErrorMessage = (): string => {
    let errorMessage = ''
    if (parseCsvError) {
      errorMessage = parseCsvError
    } else if (!isPasswordProtected && !!passwords && file) {
      errorMessage =
        'Password field found in the CSV file despite Password protection disabled, please upload an updated .csv'
    } else if (isPasswordProtected && !passwords && file) {
      errorMessage =
        'No Password field found in the CSV file despite Password protection enabled, please upload an updated .csv'
    }
    return errorMessage
  }

  return (
    <FormControl
      isInvalid={
        !!parseCsvError ||
        uploadCsvErrors.length > 0 ||
        (file && !!passwords != isPasswordProtected)
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
            <Text fontSize="14px" fontWeight="400">
              Create password that citizens would have to add before accessing
              the letter.
            </Text>
          </Stack>
          <Switch
            size="lg"
            colorScheme="green"
            onChange={handleChange}
            isChecked={isPasswordProtected}
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
            isDisabled={
              !(parsedArr.length > 0) ||
              !!parseCsvError ||
              uploadCsvErrors.length > 0 ||
              (isPasswordProtected !== !!passwords && !!file)
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
