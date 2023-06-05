import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { BiLeftArrowAlt, BiX } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { IconButton } from '~components/IconButton'
import { routes } from '~constants/routes'
import {
  BulkLetterValidationResultError,
  GetBulkLetterDto,
} from '~shared/dtos/letters.dto'

import { DownloadCsv } from './BulkIssueDrawer/DownloadCsv'
import { PreviewTemplate } from './BulkIssueDrawer/PreviewTemplate'
import { UploadCsvErrorCard } from './BulkIssueDrawer/UploadCsvErrorCard'
import { UploadCsvErrorsTable } from './BulkIssueDrawer/UploadCsvErrorsTable'
import { UploadCsvForm } from './BulkIssueDrawer/UploadCsvForm'
import { useGetTemplateById, useTemplateId } from './hooks/templates.hooks'

export const BulkIssueDrawer = (): JSX.Element => {
  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)
  const navigate = useNavigate()

  const [isPreviewTemplate, setIsPreviewTemplate] = useState(true)

  const [isShowUploadCsvErrors, setIsShowUploadCsvErrors] = useState(false)
  const [uploadCsvErrors, setUploadCsvErrors] = useState<
    BulkLetterValidationResultError[]
  >([])

  const [isShowDownloadCsv, setIsShowDownloadCsv] = useState(false)
  const [bulkLetters, setBulkLetters] = useState<GetBulkLetterDto[]>([])

  const onClose = () =>
    navigate(`/${routes.admin.index}/${routes.admin.templates}`)

  return (
    <Drawer size="lg" isOpen placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader paddingTop="1.25rem">
            {isPreviewTemplate ? (
              <HStack>
                <IconButton onClick={onClose}>
                  <BiX size="1.5rem" />
                </IconButton>
                <Heading size="md">{template?.name}</Heading>
              </HStack>
            ) : (
              <HStack>
                <IconButton onClick={() => setIsPreviewTemplate(true)}>
                  <BiLeftArrowAlt size="1.5rem" />
                </IconButton>
                <VStack alignItems="left" spacing={0}>
                  <Heading size="md">Issue {template?.name}</Heading>
                  <Button
                    variant="link"
                    padding={0}
                    onClick={() => setIsPreviewTemplate(true)}
                  >
                    <Text fontSize="xs">View template</Text>
                  </Button>
                </VStack>
              </HStack>
            )}
          </DrawerHeader>
          <Divider />
          <DrawerBody padding={0}>
            {isPreviewTemplate ? (
              <PreviewTemplate onToggle={() => setIsPreviewTemplate(false)} />
            ) : isShowDownloadCsv ? (
              <DownloadCsv
                bulkLetters={bulkLetters}
                onDownload={() => {
                  setIsShowDownloadCsv(false)
                  onClose()
                }}
              />
            ) : isShowUploadCsvErrors ? (
              <UploadCsvErrorsTable
                uploadCsvErrors={uploadCsvErrors}
                onClose={() => setIsShowUploadCsvErrors(false)}
              />
            ) : (
              <VStack padding={8} spacing={8} alignItems="stretch">
                <UploadCsvErrorCard
                  uploadCsvErrors={uploadCsvErrors}
                  onToggle={() => setIsShowUploadCsvErrors(true)}
                />
                <UploadCsvForm
                  onSuccess={(letters: GetBulkLetterDto[]) => {
                    setUploadCsvErrors([])
                    setBulkLetters(letters)
                    setIsShowDownloadCsv(true)
                  }}
                  onError={(errors: BulkLetterValidationResultError[]) => {
                    setUploadCsvErrors(errors)
                  }}
                  uploadCsvErrors={uploadCsvErrors}
                  reset={() => setUploadCsvErrors([])}
                />
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
