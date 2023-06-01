import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Spacer,
  useControllableState,
  VStack,
} from '@chakra-ui/react'
import { Attachment } from '@opengovsg/design-system-react'

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

  const toast = useToast()
  const { parsedArr, parseCsv, error: parseCsvError } = useParseCsv()

  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)

  const downloadSample = () => {
    arrToCsv(`${template.name} Sample.csv`, template.fields)
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
    await mutateAsync({ templateId, letterParamMaps: parsedArr })
  }

  return (
    <FormControl isInvalid={!!parseCsvError || uploadCsvErrors.length > 0}>
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
        <FormErrorMessage>{parseCsvError}</FormErrorMessage>
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
              uploadCsvErrors.length > 0
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
