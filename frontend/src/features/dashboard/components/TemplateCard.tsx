import { Card, CardHeader, Flex, Heading, Image } from '@chakra-ui/react'

type TemplateCardProps = {
  name: string
  thumbnailS3Path: string
}

export const TemplateCard = (templateCardProps: TemplateCardProps) => {
  return (
    <Card padding={5} width={240} height={260}>
      <Flex justifyContent="center">
        <Image
          src={templateCardProps.thumbnailS3Path}
          width={170}
          height={170}
        />
      </Flex>
      <CardHeader>
        <Heading size="20px">{templateCardProps.name}</Heading>
      </CardHeader>
    </Card>
  )
}
