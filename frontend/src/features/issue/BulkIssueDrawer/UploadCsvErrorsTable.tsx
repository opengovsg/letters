import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Tr,
} from '@chakra-ui/react'
import { BiLeftArrowAlt } from 'react-icons/bi'

import {
  BulkLetterValidationResultError,
  BulkLetterValidationResultErrorMessage,
} from '~shared/dtos/letters.dto'
import { pluraliseIfNeeded } from '~utils/stringUtils'

interface UploadCsvErrorsTableProps {
  uploadCsvErrors: BulkLetterValidationResultError[]
  onClose: () => void
}

export const UploadCsvErrorsTable = ({
  uploadCsvErrors,
  onClose,
}: UploadCsvErrorsTableProps): JSX.Element => {
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
    <Box padding={8}>
      <HStack>
        <Button
          variant="clear"
          padding={0}
          minWidth={0}
          minHeight={0}
          color=""
          onClick={onClose}
        >
          <BiLeftArrowAlt size="1.5rem" />
        </Button>
        <Text>
          {uploadCsvErrors.length} {pluraliseIfNeeded(uploadCsvErrors, 'error')}
        </Text>
      </HStack>
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
    </Box>
  )
}
