import { Box, HStack, Text } from '@chakra-ui/react'

import { ReactComponent as CheckMark } from '~/assets/CheckMark.svg'
import { ReactComponent as CsvIcon } from '~/assets/CsvIcon.svg'
import {
  useGetTemplateById,
  useTemplateId,
} from '~features/issue/hooks/templates.hooks'
import { GetBulkLetterDto } from '~shared/dtos/letters.dto'
import { jsonArrToCsv } from '~utils/csvUtils'
import { getLetterPublicLink } from '~utils/linkUtils'
import { pluraliseIfNeeded } from '~utils/stringUtils'

import { BulkIssueCard } from './BulkIssueCard'

interface BulkIssueCompletionCardProps {
  bulkLetters: GetBulkLetterDto[]
  onDownload: () => void
  shouldDisplay: boolean
  goToPrevious: () => void
}

export const BulkIssueCompletionCard = ({
  bulkLetters,
  onDownload,
  shouldDisplay,
  goToPrevious,
}: BulkIssueCompletionCardProps): JSX.Element => {
  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)

  const downloadCsvName = `${template?.name} [COMPLETED].csv`

  const handleDownloadCsv = () => {
    if (!bulkLetters) return
    const bulkLettersWithLink = bulkLetters.map((letter: GetBulkLetterDto) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { publicId, createdAt, ...letterParams } = letter
      return {
        ...letterParams,
        'Date of Issue': createdAt,
        'Letter Link': `https://${getLetterPublicLink(publicId)}`,
      }
    })
    jsonArrToCsv(downloadCsvName, bulkLettersWithLink)
    onDownload()
  }

  return (
    <BulkIssueCard
      shouldDisplay={shouldDisplay}
      handleNextClick={handleDownloadCsv}
      handlePreviousClick={() => goToPrevious()}
      buttonConfig={{ nextButtonLabel: 'Download file' }}
    >
      <Box padding={'5px'}>
        <HStack direction="row" spacing={2}>
          <Text textStyle="h6">
            {bulkLetters.length} {pluraliseIfNeeded(bulkLetters, 'letter')}{' '}
            generated
          </Text>
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
          {downloadCsvName}
        </Box>
      </Box>
    </BulkIssueCard>
  )
}
