import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '~constants/routes'
import {
  BulkLetterValidationResultError,
  GetBulkLetterDto,
} from '~shared/dtos/letters.dto'

import { DownloadCsv } from './BulkIssueDrawer/DownloadCsv'
import { UploadCsvErrorCard } from './BulkIssueDrawer/UploadCsvErrorCard'
import { UploadCsvErrorsTable } from './BulkIssueDrawer/UploadCsvErrorsTable'
import { UploadCsvForm } from './BulkIssueDrawer/UploadCsvForm'
import { useGetTemplateById, useTemplateId } from './hooks/templates.hooks'

export const BulkIssueDrawer = (): JSX.Element => {
  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)
  const navigate = useNavigate()

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
          <DrawerCloseButton />
          <DrawerHeader>Issue {template?.name}</DrawerHeader>
          <DrawerBody padding={8}>
            {isShowDownloadCsv ? (
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
              <VStack spacing={8} alignItems="stretch">
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
