import { Table, TableContainer, Td, Th, Tr, VStack } from '@chakra-ui/react'
import { Link, Pagination, Tag } from '@opengovsg/design-system-react'
import { useState } from 'react'

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
            <HeaderCell>Template</HeaderCell>
            <HeaderCell>Link</HeaderCell>
            <HeaderCell>Shared with</HeaderCell>
            <HeaderCell>Status</HeaderCell>
          </Tr>
          {letters
            ? letters.map((letter) => {
                const link = `letters.gov.sg/letters/${letter.publicId}` // TODO: fix link
                return (
                  <Tr key={letter.publicId}>
                    <Td>{letter.templateName}</Td>
                    <Td>
                      <Link href={link}>{link}</Link>
                    </Td>
                    <Td>TODO: shared with</Td>
                    <Td>
                      <Tag colorScheme="gray">Sent</Tag>
                    </Td>
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
