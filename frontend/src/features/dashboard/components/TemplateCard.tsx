import { Card, CardHeader, Flex, Heading, Image, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

type TemplateCardProps = {
  name: string
  updatedAt: string
  thumbnailS3Path: string
}

export const TemplateCard = (templateCardProps: TemplateCardProps) => {
  return (
    <Card padding={5} width={240} height={330}>
      <Flex justifyContent="center">
        <Image
          src={templateCardProps.thumbnailS3Path}
          width={170}
          height={170}
        />
      </Flex>
      <CardHeader>
        <Heading size="20px">{templateCardProps.name}</Heading>
        <Text fontSize="xs">
          Edited {dayjs(templateCardProps.updatedAt).fromNow()}
        </Text>
      </CardHeader>
    </Card>
  )
}
