import {
  Box,
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Spacer,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Tr,
  useControllableState,
  VStack,
} from '@chakra-ui/react'
import { Attachment, Infobox } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { BiChevronRight, BiLeftArrowAlt } from 'react-icons/bi'
import { MdError } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as CheckMark } from '~/assets/CheckMark.svg'
import { ReactComponent as CsvIcon } from '~/assets/CsvIcon.svg'
import { ReactComponent as LightBulb } from '~/assets/LightBulb.svg'
import { routes } from '~constants/routes'
import { useToast } from '~hooks/useToast'
import {
  BulkLetterValidationResultError,
  BulkLetterValidationResultErrorMessage,
  GetBulkLettersDto,
} from '~shared/dtos/letters.dto'
import { arrToCsv, jsonArrToCsv } from '~utils/csvUtils'
import { pluraliseIfNeeded } from '~utils/stringUtils'

import {
  useCreateBulkLetterMutation,
  useGetTemplateById,
  useTemplateId,
} from './hooks/templates.hooks'
import useParseCsv from './hooks/useParseCsv'

export const BulkIssueDrawer = (): JSX.Element => {
  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)
  const [isShowUploadCsvErrors, setIsShowUploadCsvErrors] = useState(false)
  const [uploadCsvErrors, setUploadCsvErrors] = useState<
    BulkLetterValidationResultError[]
  >([])
  const [bulkLetters, setBulkLetters] = useState<GetBulkLettersDto[]>([])
  const navigate = useNavigate()
  const toast = useToast()

  const {
    mutateAsync,
    isLoading,
    isSuccess: isUploadSuccess,
  } = useCreateBulkLetterMutation({
    onSuccess: (res) => {
      setBulkLetters(res)
      setUploadCsvErrors([])
      toast({
        title: `${res.length} ${pluraliseIfNeeded(res, 'letter')} created`,
        status: 'success',
      })
    },
    onError: (errors) => {
      setUploadCsvErrors(errors)
    },
  })
  const { parsedArr, parseCsv, error: parseCsvError } = useParseCsv()
  const [file, setFile] = useControllableState<File | undefined>({})

  const onClose = () =>
    navigate(`/${routes.admin.index}/${routes.admin.templates}`)

  const downloadSample = () => {
    arrToCsv(`${template.name} Sample.csv`, template.fields)
  }

  const handleSubmit = async (): Promise<void> => {
    await mutateAsync({ templateId, letterParamMaps: parsedArr })
  }

  const handleDownloadCsv = () => {
    jsonArrToCsv(`${template.name}[COMPLETED].csv`, bulkLetters)
    onClose()
  }

  const UploadCsvErrorsTable = () => {
    const HeaderCell = ({ children }: React.PropsWithChildren) => {
      return (
        <Th
          textColor="interaction.main.default"
          textStyle="subhead-2"
          textTransform="none"
          fontWeight="500"
          fontSize="0.875rem"
          letterSpacing="none"
          h="4rem"
        >
          {children}
        </Th>
      )
    }

    return (
      <TableContainer w="100%">
        <Table variant="simple">
          <Tr backgroundColor="interaction.main-subtle.default">
            <HeaderCell>Row #</HeaderCell>
            <HeaderCell>Errors</HeaderCell>
          </Tr>
          {uploadCsvErrors.map((error) => {
            return (
              // TODO: find a better key for the error
              // TODO: group all errors of the same row number together. should this be done on the frontend or backend?
              <Tr key={JSON.stringify(error)}>
                {/* We add 2 because the first row with data in the CSV is row 2, even though it has index 0 */}
                <Td>{error.id + 2}</Td>
                <Td>
                  {error.param}{' '}
                  {error.message ===
                  BulkLetterValidationResultErrorMessage.INVALID_ATTRIBUTE
                    ? 'is not a valid attribute'
                    : 'is missing'}
                </Td>
              </Tr>
            )
          })}
        </Table>
      </TableContainer>
    )
  }

  const UploadCsvForm = () => {
    return (
      <FormControl isInvalid={!!parseCsvError || uploadCsvErrors.length > 0}>
        <VStack spacing={4} align="stretch">
          {uploadCsvErrors.length > 0 && (
            <Card
              borderWidth="1px"
              boxShadow=""
              borderColor="base.divider.medium"
              padding="1rem"
            >
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
                <Button
                  variant="clear"
                  rightIcon={<BiChevronRight size="1.5rem" />}
                  onClick={() => setIsShowUploadCsvErrors(true)}
                >
                  View
                </Button>
              </Flex>
            </Card>
          )}
          <Heading size="sm">Upload the completed .CSV file</Heading>
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
              isDisabled={!(parsedArr.length > 0) || uploadCsvErrors.length > 0}
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

  const DownloadCsv = () => {
    return (
      <>
        <HStack direction="row" spacing={2}>
          <CheckMark />
          <Heading size="sm">
            {bulkLetters.length} {pluraliseIfNeeded(bulkLetters, 'letter')}{' '}
            generated
          </Heading>
        </HStack>
        <Box
          bg="#F9F9F9"
          w="100%"
          height="200"
          color="black"
          marginTop="5"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CsvIcon />
        </Box>
        <Box bg="#DDEAFF" w="100%" p={4} color="black" fontWeight="500">
          {`${template.name}[COMPLETED].csv`}
        </Box>
        <Infobox
          fontWeight="500"
          variant="warning"
          useMarkdown
          marginTop={5}
          icon={<LightBulb />}
        >
          You can send out these letters through
          [Postman](https://postman.gov.sg/)
        </Infobox>
        <Button
          flex="auto"
          onClick={handleDownloadCsv}
          marginTop={5}
          width="100%"
        >
          Download File
        </Button>
      </>
    )
  }

  return (
    <Drawer size="lg" isOpen placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isShowUploadCsvErrors ? (
              <HStack>
                <Button
                  variant="clear"
                  padding={0}
                  minWidth={0}
                  minHeight={0}
                  color=""
                  onClick={() => setIsShowUploadCsvErrors(false)}
                >
                  <BiLeftArrowAlt size="1.5rem" />
                </Button>
                <Text>
                  {uploadCsvErrors.length}{' '}
                  {pluraliseIfNeeded(uploadCsvErrors, 'error')}
                </Text>
              </HStack>
            ) : (
              `Issue ${template?.name}`
            )}
          </DrawerHeader>
          <DrawerBody padding={8}>
            {isUploadSuccess ? (
              <DownloadCsv />
            ) : isShowUploadCsvErrors ? (
              <UploadCsvErrorsTable />
            ) : (
              <UploadCsvForm />
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
