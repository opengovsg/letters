import {
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'

type TemplateCardProps = {
  name: string
  thumbnailS3Path: string
}

export const TemplateCard = (templateCardProps: TemplateCardProps) => {
  const [zoom, setZoom] = useState(false)

  function handleMouseHover() {
    setZoom((prev) => !prev)
  }

  return (
    <Card
      style={
        zoom
          ? {
              transition: 'transform .2s',
              transform: 'scale(1.2)',
              zIndex: '1',
            }
          : {}
      }
      padding={5}
      width={240}
      height={zoom ? 330 : 270}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      <Flex justifyContent="center">
        <Image
          src={templateCardProps.thumbnailS3Path}
          width={170}
          height={170}
        />
      </Flex>
      <CardHeader>
        <Heading size="20px">
          <Text noOfLines={2}>{templateCardProps.name}</Text>
        </Heading>
      </CardHeader>
      {zoom && <Button>Issue Letter</Button>}
    </Card>
  )
}
