import { Box, Table, TableContainer, Td, Text, Th, Tr } from '@chakra-ui/react'
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

  const errorsByRow = uploadCsvErrors.reduce(
    (errorGroup: Array<BulkLetterValidationResultError[]>, item) => {
      if (errorGroup[item.id]) {
        errorGroup[item.id].push(item)
      } else {
        errorGroup[item.id] = [item]
      }
      return errorGroup
    },
    new Array<BulkLetterValidationResultError[]>(uploadCsvErrors.length),
  )

  const errorTableRows = errorsByRow.map((errorData, index) => {
    return (
      <Tr key={JSON.stringify(index)}>
        {/* We add 2 because the first row with data in the CSV is row 2, even though it has index 0 */}
        <Td>{index + 2}</Td>
        <Td>
          {errorData.map((error, index) => {
            return (
              <Text key={index}>
                {/* Add 1 because index starts from 0 actually */}
                {index + 1}
                {'. '}
                {error.param}{' '}
                {error.message ===
                BulkLetterValidationResultErrorMessage.INVALID_ATTRIBUTE
                  ? 'is not a valid attribute'
                  : 'is missing'}
              </Text>
            )
          })}
        </Td>
      </Tr>
    )
  })

  return (
    <Box paddingTop={4}>
      <TableContainer w="100%">
        <Table variant="simple">
          <Tr backgroundColor="interaction.main-subtle.default">
            <HeaderCell>Row #</HeaderCell>
            <HeaderCell>Errors</HeaderCell>
          </Tr>
          {errorTableRows}
        </Table>
      </TableContainer>
    </Box>
  )
}
