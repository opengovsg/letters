import {
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
        <FormErrorMessage>{parseCsvError}</FormErrorMessage>
        <Spacer />
        <Flex justify="space-between">
          <Button
            flex="auto"
            variant="outline"
            isDisabled={!template?.name || !template?.fields}
            onClick={downloadSample}
          >
            Download Sample CSV
          </Button>
          <Spacer />
          <Button
            flex="auto"
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
