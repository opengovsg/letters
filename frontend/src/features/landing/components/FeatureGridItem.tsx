import { Box, Image, Stack, Text } from '@chakra-ui/react'

interface FeatureGridItemProps {
  image?: string
  title: string
  description: string
}

export const FeatureGridItem = ({
  image,
  title,
  description,
}: FeatureGridItemProps): JSX.Element => {
  return (
    <Stack spacing="1rem">
      <Box maxW="20rem">
        <Image src={image} aria-hidden />
      </Box>
      <Text textStyle="h4">{title}</Text>
      <Box mt="1rem">
        <Text
          sx={{
            text: {
              textStyle: 'body-1',
              color: 'secondary.500',
            },
          }}
        >
          {description}
        </Text>
      </Box>
    </Stack>
  )
}
