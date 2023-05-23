import {
  Button,
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
  Spacer,
  Text,
  useControllableState,
  VStack,
} from '@chakra-ui/react'
import { Attachment } from '@opengovsg/design-system-react'
import { useNavigate } from 'react-router-dom'

import { routes } from '~constants/routes'
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
  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useCreateBulkLetterMutation()
  const { parsedArr, parseCsv, error } = useParseCsv()
  const [file, setFile] = useControllableState<File | undefined>({})

  const onClose = () => navigate(routes.admin.templates)

  const downloadSample = () => {
    arrToCsv(`${template.name} Sample.csv`, template.fields)
  }

  const handleSubmit = async (): Promise<void> => {
    await mutateAsync({ templateId, letterParamMaps: parsedArr })
    onClose()
  }

  return (
    <Drawer size="lg" isOpen placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Issue {template?.name}</DrawerHeader>
          <DrawerBody padding={8}>
            <FormControl isInvalid={!!error}>
              <VStack spacing={4} align="stretch">
                <Heading size="sm">Upload the completed .CSV file</Heading>
                <Attachment
                  onChange={(file) => {
                    setFile(file)
                    void parseCsv(file)
                  }}
                  accept={'.csv'}
                  value={file}
                  name={'fileInput'}
                  isInvalid={!!error}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
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
                    isDisabled={!(parsedArr.length > 0)}
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
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
