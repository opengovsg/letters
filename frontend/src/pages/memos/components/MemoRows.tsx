import { Divider, Spinner, Stack } from '@chakra-ui/react'

import { MemoMetaResponseDto } from '~/pages/dashboard/DashboardService'

import { CONTAINER_MAXW } from '../MemosPage'

import { MemoRow } from './MemoRow'

export interface MemoRowsProps {
  rows: MemoMetaResponseDto[]
  isLoading: boolean
}

export const MemoRows = ({ rows, isLoading }: MemoRowsProps): JSX.Element => {
  if (isLoading) {
    return (
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
    )
  }
  return (
    <Stack
      maxW={CONTAINER_MAXW}
      m="auto"
      spacing={0}
      divider={<Divider borderColor="neutral.300" />}
    >
      {rows.map((meta) => (
        <MemoRow px="2rem" key={meta.id} memoMeta={meta} />
      ))}
    </Stack>
  )
}
