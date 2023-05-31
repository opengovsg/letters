import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import { Infobox } from '@opengovsg/design-system-react'

import { ReactComponent as CheckMark } from '~/assets/CheckMark.svg'
import { ReactComponent as CsvIcon } from '~/assets/CsvIcon.svg'
import { ReactComponent as LightBulb } from '~/assets/LightBulb.svg'
import {
  useGetTemplateById,
  useTemplateId,
} from '~features/issue/hooks/templates.hooks'
import { GetBulkLetterDto } from '~shared/dtos/letters.dto'
import { jsonArrToCsv } from '~utils/csvUtils'
import { pluraliseIfNeeded } from '~utils/stringUtils'

interface DownloadCsvProps {
  bulkLetters: GetBulkLetterDto[]
  onDownload: () => void
}

export const DownloadCsv = ({
  bulkLetters,
  onDownload,
}: DownloadCsvProps): JSX.Element => {
  const { templateId } = useTemplateId()
  const { template } = useGetTemplateById(templateId)

  const downloadCsvName = `${template.name} [COMPLETED].csv`

  const handleDownloadCsv = () => {
    if (!bulkLetters) return
    const bulkLettersWithLink = bulkLetters.map((letter: GetBulkLetterDto) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { publicId, createdAt, ...letterParams } = letter
      return {
        ...letterParams,
        'Date of Issue': createdAt,
        'Letter Link': `${document.location.host}/letters/${publicId}`,
      }
    })
    jsonArrToCsv(downloadCsvName, bulkLettersWithLink)
    onDownload()
  }

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
        {downloadCsvName}
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
