import {
  Box,
  Table,
  TableContainer,
  Td,
  Th,
  Tr,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Badge, Link, Pagination } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useGetLetters } from '~features/dashboard/hooks/dashboard.hooks'
import { GetLetterDto } from '~shared/dtos/letters.dto'
import { getLetterPublicLink } from '~utils/linkUtils'

import { IssuedLetterDrawer } from './components/IssuedLetterDrawer'

export const IssuedLettersPage = (): JSX.Element => {
  const PAGE_SIZE = 10
  const [currentPage, setCurrentPage] = useState(0)
  const { letters, count } = useGetLetters(PAGE_SIZE, currentPage * PAGE_SIZE)
  const drawerDisclosure = useDisclosure()
  const [selectedLetter, setSelectedLetter] = useState<
    GetLetterDto | undefined
  >()

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
    <>
      <VStack spacing="1rem" px="16px" py="1rem" align="center" w="100%">
        <TableContainer w="100%">
          <Table variant="simple">
            <Tr backgroundColor="interaction.main-subtle.default">
              <HeaderCell>Letter link</HeaderCell>
              <HeaderCell>Issued on</HeaderCell>
              <HeaderCell>Read Receipt</HeaderCell>
              <HeaderCell>Template used</HeaderCell>
            </Tr>
            {letters &&
              letters.map((letter) => (
                <Box
                  key={letter.publicId}
                  _hover={{ background: 'gray.50' }}
                  display="table-row"
                  cursor="pointer"
                  textDecoration="none"
                  textColor="default"
                  onClick={() => {
                    drawerDisclosure.onOpen()
                    setSelectedLetter(letter)
                  }}
                >
                  <Td>
                    <Link
                      as={RouterLink}
                      to={`/${letter.publicId}`}
                      textDecoration="none"
                      textColor="default"
                    >
                      {getLetterPublicLink(letter.publicId)}
                    </Link>
                  </Td>
                  <Td>{letter.createdAt}</Td>
                  <Td>
                    {letter.firstReadAt ? (
                      <Badge variant="subtle">Read</Badge>
                    ) : (
                      <Badge variant="subtle" colorScheme="grey">
                        Unread
                      </Badge>
                    )}
                  </Td>
                  <Td>{letter.templateName}</Td>
                </Box>
              ))}
          </Table>
        </TableContainer>
        {count && (
          <Pagination
            totalCount={count}
            pageSize={PAGE_SIZE}
            onPageChange={(newPage) => setCurrentPage(newPage - 1)}
            currentPage={currentPage + 1}
          />
        )}
      </VStack>
      <IssuedLetterDrawer {...drawerDisclosure} letter={selectedLetter} />
    </>
  )
}
