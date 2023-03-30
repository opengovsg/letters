import { Divider, Spinner, Stack } from '@chakra-ui/react'

import { TemplateMetaResponseDto } from '~/pages/dashboard/DashboardService'

import { CONTAINER_MAXW } from '../TemplatesPage'

import { TemplateRow } from './TemplateRow'

export interface TemplateRowsProps {
  rows: TemplateMetaResponseDto[]
  isLoading: boolean
}

export const TemplateRows = ({
  rows,
  isLoading,
}: TemplateRowsProps): JSX.Element => {
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
        <TemplateRow px="2rem" key={meta.id} templateMeta={meta} />
      ))}
    </Stack>
  )
}
