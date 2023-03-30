import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Container, Grid } from '@chakra-ui/react'
import { chunk } from 'lodash'

import Pagination from '~components/Pagination'

import { MemoHeader } from './components/MemoHeader'
import { MemoRows } from './components/MemoRows'
import { useMemosDashboard } from './queries'

export const CONTAINER_MAXW = '120rem'
const PAGE_DEFAULTS = {
  size: 10,
  pageNumber: 1,
}

const useMemosPage = () => {
  const { data: dashboardMemos, isLoading } = useMemosDashboard()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(
    searchParams.get('page') ?? PAGE_DEFAULTS.pageNumber,
  )
  const pageSize = Number(searchParams.get('size') ?? PAGE_DEFAULTS.size)

  const setPageNumber = useCallback(
    (page: number) => {
      setSearchParams({ page: String(page) })
    },
    [setSearchParams],
  )

  const chunkedData = useMemo(
    () => chunk(dashboardMemos, pageSize),
    [pageSize, dashboardMemos],
  )

  const paginatedData = useMemo(() => {
    if (currentPage < 1 || currentPage > chunkedData.length) {
      return []
    }
    return chunkedData[currentPage - 1]
  }, [chunkedData, currentPage])

  return {
    isLoading: isLoading,
    currentPage,
    totalMemoCount: dashboardMemos?.length,
    paginatedData,
    setPageNumber,
  }
}

export const MemosPage = (): JSX.Element => {
  const {
    isLoading,
    totalMemoCount,
    paginatedData,
    currentPage,
    setPageNumber,
  } = useMemosPage()

  return (
    <Grid
      flex={1}
      bg="neutral.100"
      templateColumns="1fr"
      templateRows="auto 1fr auto"
      templateAreas="'header' 'main' 'footer'"
    >
      <Container
        gridArea="header"
        maxW={CONTAINER_MAXW}
        borderBottom="1px solid var(--chakra-colors-neutral-300)"
        px="2rem"
        py="1rem"
      >
        <MemoHeader isLoading={isLoading} />
      </Container>
      <Box gridArea="main">
        <Box />
        <MemoRows rows={paginatedData} isLoading={isLoading} />
      </Box>
      <Container
        gridArea="footer"
        py={{ base: '1rem', md: '3rem' }}
        px="2rem"
        maxW={CONTAINER_MAXW}
        borderTop="1px solid var(--chakra-colors-neutral-300)"
      >
        <Pagination
          isDisabled={isLoading}
          currentPage={currentPage}
          totalCount={totalMemoCount ?? 0}
          onPageChange={setPageNumber}
          pageSize={PAGE_DEFAULTS.size}
        />
      </Container>
    </Grid>
  )
}
