import { Flex, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { unversionedApi } from '~lib/api'

import { TemplateCard } from './TemplateCard'

type GetTemplateDTO = {
  id: number
  fields: string[]
  html: string
  name: string
  thumbnailS3Path: string
  createdAt: string
  updatedAt: string
}

export const useGetTemplates = () => {
  const { data, isLoading } = useQuery(['templates'], () =>
    unversionedApi.url(`/templates`).get().json<GetTemplateDTO[]>(),
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { templates: data!, isTemplatesLoading: isLoading }
}

export const DashboardBody = () => {
  const { templates, isTemplatesLoading } = useGetTemplates()
  return (
    <Flex flexDir="row" flex="1">
      <Wrap px={10} flex="1" spacing="30px" py={10}>
        {templates || !isTemplatesLoading ? (
          templates.map((template, index) => (
            <WrapItem key={index}>
              <TemplateCard
                name={template.name}
                thumbnailS3Path={template.thumbnailS3Path}
                key={index}
                id={template.id}
              />
            </WrapItem>
          ))
        ) : (
          <Text>Loading</Text>
        )}
      </Wrap>
    </Flex>
  )
}
