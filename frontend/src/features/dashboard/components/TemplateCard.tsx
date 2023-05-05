import {
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react'
import React from 'react'

type TemplateCardProps = {
  name: string
  thumbnailS3Path: string
}

export const TemplateCard = (templateCardProps: TemplateCardProps) => {
  const [zoom, setZoom] = React.useState(false)

  function handleMouseHover() {
    setZoom((prev) => !prev)
  }

  return (
    // WIP:
    // Issues: - parent container does not increase when hover/zoom -> card side cut off
    //         - Button and Card size magically change/appear on hover/zoom -> should be a transition
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
      height={zoom ? 330 : 260}
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
        <Heading size="20px">{templateCardProps.name}</Heading>
      </CardHeader>
      {zoom && <Button>Issue Letter</Button>}
    </Card>
  )
}
