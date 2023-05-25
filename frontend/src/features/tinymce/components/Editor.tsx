import { Box, Spinner, Text, VStack } from '@chakra-ui/react'
import { Editor as TinymceEditor } from '@tinymce/tinymce-react'

import { useTinymceApiKey } from '../hooks/tinymce.hooks'

interface LetterViewerProps {
  letterPublicId: string
  html: string | undefined
  isLoading: boolean
  isDisabled?: boolean
  isInline?: boolean
}

export const Editor = ({
  letterPublicId,
  html,
  isLoading,
  isDisabled = false,
  isInline = false,
}: LetterViewerProps): JSX.Element => {
  const { tinymceApiKey, isLoadingTinymceApiKey } = useTinymceApiKey()
  if (isLoading || isLoadingTinymceApiKey || !html) {
    return <Spinner />
  }
  return (
    <VStack spacing={0}>
      <Box
        borderX="2px"
        borderTop="2px"
        borderColor="base.divider.medium"
        bgColor="white"
      >
        {tinymceApiKey ? (
          <TinymceEditor
            apiKey={tinymceApiKey}
            initialValue={html}
            init={{
              inline: isInline,
              content_css_cors: true,
            }}
            disabled={isDisabled}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        )}
      </Box>
      <Box
        borderX="2px"
        borderBottom="2px"
        borderColor="base.divider.medium"
        bgColor="grey.50"
        width="100%"
        paddingX="28px"
        paddingY="0.75rem"
      >
        <VStack spacing="0.25rem" alignItems="flex-start">
          <Text textColor="black">
            Letter ID: <b>{letterPublicId}</b>
          </Text>
          <Text textStyle="legal" textColor="grey.400">
            This letter is generated using {document.location.host}. Forging or
            morphing is a criminal offence.
          </Text>
        </VStack>
      </Box>
    </VStack>
  )
}
