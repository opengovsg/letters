import { Flex, Text, Wrap, WrapItem } from '@chakra-ui/react'

import { useGetTemplates } from '../hooks/dashboard.hooks'
import { TemplateCard } from './TemplateCard'

export const TemplatesBody = () => {
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
