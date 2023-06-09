import { Table, TableContainer, Td, Th, Tr, VStack } from '@chakra-ui/react'
import { Link, Pagination, Tag } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useGetLetters } from '~features/dashboard/hooks/dashboard.hooks'

export const IssuedLettersPage = (): JSX.Element => {
  const PAGE_SIZE = 10
  const [currentPage, setCurrentPage] = useState(0)
  const { letters, count } = useGetLetters(PAGE_SIZE, currentPage * PAGE_SIZE)

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
    <VStack spacing="1rem" px="16px" py="1rem" align="center" w="100%">
      <TableContainer w="100%">
        <Table variant="simple">
          <Tr backgroundColor="interaction.main-subtle.default">
            <HeaderCell>Letter link</HeaderCell>
            <HeaderCell>Issued on</HeaderCell>
            <HeaderCell>Template used</HeaderCell>
          </Tr>
          {letters
            ? letters.map((letter) => {
                const link = `/letters/${letter.publicId}`
                const linkWithHost = `${document.location.host}${link}`
                return (
                  <Tr key={letter.publicId}>
                    <Td>
                      <Link
                        as={RouterLink}
                        to={link}
                        textDecoration="none"
                        textColor="default"
                      >
                        {linkWithHost}
                      </Link>
                    </Td>
                    <Td>{letter.createdAt}</Td>
                    <Td>{letter.templateName}</Td>
                  </Tr>
                )
              })
            : null}
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
  )
}
