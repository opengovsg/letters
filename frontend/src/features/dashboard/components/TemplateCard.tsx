import {
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TemplatePreviewFallback from '~/assets/TemplatePreviewFallback.svg'

type TemplateCardProps = {
  name: string
  thumbnailS3Path: string
  id: number
}

export const TemplateCard = (templateCardProps: TemplateCardProps) => {
  const [zoom, setZoom] = useState(false)
  const navigate = useNavigate()

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
      width={240}
      height={270}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
      onClick={() => navigate(`${templateCardProps.id}/issue`)}
    >
      <Flex justifyContent="center" background="#F8F9F9" paddingTop={5}>
        <Image
          src={templateCardProps.thumbnailS3Path}
          width={170}
          height={170}
          fallbackSrc={TemplatePreviewFallback}
          borderTopRadius={'10px'}
        />
      </Flex>
      <CardHeader marginLeft={5} marginRight={5}>
        <Heading size="20px">
          <Text noOfLines={2}>{templateCardProps.name}</Text>
        </Heading>
      </CardHeader>
    </Card>
  )
}
