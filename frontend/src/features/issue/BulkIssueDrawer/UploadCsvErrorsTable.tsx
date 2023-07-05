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

  const getErrorMessage = (errorMessage: string): string => {
    console.log('this is the error messsage', errorMessage)
    if (
      errorMessage === BulkLetterValidationResultErrorMessage.INVALID_ATTRIBUTE
    ) {
      return ' is not a valid attribute'
    }
    if (
      errorMessage ===
      BulkLetterValidationResultErrorMessage.PASSWORD_NOT_ALPHANUMERIC
    ) {
      return ' must be alphanumeric.'
    }
    if (
      errorMessage === BulkLetterValidationResultErrorMessage.SHORT_PASSWORD
    ) {
      return ' must contains a minimum of 8 characters.'
    }
    return 'is missing'
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
                {error.param} {getErrorMessage(error.message)}
              </Text>
            )
          })}
        </Td>
      </Tr>
    )
  })

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
          {errorTableRows}
        </Table>
      </TableContainer>
    </Box>
  )
}
