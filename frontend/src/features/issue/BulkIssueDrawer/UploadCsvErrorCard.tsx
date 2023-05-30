import { Button, Card, Flex, HStack, Text } from '@chakra-ui/react'
import { BiChevronRight } from 'react-icons/bi'
import { MdError } from 'react-icons/md'

import { BulkLetterValidationResultError } from '~shared/dtos/letters.dto'
import { pluraliseIfNeeded } from '~utils/stringUtils'

interface UploadCsvErrorCardProps {
  uploadCsvErrors: BulkLetterValidationResultError[]
  onToggle: () => void
}

export const UploadCsvErrorCard = ({
  uploadCsvErrors,
  onToggle,
}: UploadCsvErrorCardProps): JSX.Element => {
  if (!uploadCsvErrors || uploadCsvErrors.length === 0) return <></>
  return (
    <Card
      borderWidth="1px"
      boxShadow=""
      borderColor="base.divider.medium"
      padding="1rem"
    >
      <Flex flexDir="row" alignItems="center" justifyContent="space-between">
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
          onClick={onToggle}
        >
          View
        </Button>
      </Flex>
    </Card>
  )
}
