import {
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
import { Attachment } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { BiChevronRight, BiLeftArrowAlt } from 'react-icons/bi'
import { MdError } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import { useToast } from '~hooks/useToast'
import {
  BulkLetterValidationResultError,
  BulkLetterValidationResultErrorMessage,
} from '~shared/dtos/letters.dto'
import { arrToCsv } from '~utils/csvUtils'

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
  const navigate = useNavigate()
  const toast = useToast()

  const { mutateAsync, isLoading } = useCreateBulkLetterMutation({
    onSuccess: (res) => {
      setUploadCsvErrors([])
      // TODO: display CSV of generated letters, as per https://www.figma.com/file/BIQ4C39L4kH3WR2cfcLxDM/Letters?type=design&node-id=657-53961&t=BYFCu62CTVRyZ5Mh-0
      onClose()
      toast({
        title: `${res.length} letters created`,
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
                    {uploadCsvErrors.length} errors detected
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
                <Text>{uploadCsvErrors.length} errors</Text>
              </HStack>
            ) : (
              `Issue ${template?.name}`
            )}
          </DrawerHeader>
          <DrawerBody padding={8}>
            {isShowUploadCsvErrors ? (
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
