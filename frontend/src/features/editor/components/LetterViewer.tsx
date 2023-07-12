import { Box, BoxProps, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { Dispatch, useCallback } from 'react'

import { sanitizeHtml } from '~shared/util/html-sanitizer'
import { HEIGHT_A4, WIDTH_A4 } from '~utils/htmlUtils'

import { LetterQRCode } from './LetterQRCode'

interface LetterViewerProps extends BoxProps {
  letterPublicId?: string
  html: string | undefined
  isLoading: boolean
  setHeight?: Dispatch<React.SetStateAction<number | undefined>>
}

export const LetterViewer = ({
  letterPublicId,
  html,
  isLoading,
  setHeight,
  ...styleProps
}: LetterViewerProps): JSX.Element => {
  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setHeight && setHeight(node.offsetHeight)
      }
    },
    [setHeight],
  )

  if (isLoading || !html) {
    return <Spinner />
  }
  const cleanHtml = sanitizeHtml(html)

  return (
    <VStack {...styleProps} spacing={0} ref={ref}>
      <Box
        minHeight={HEIGHT_A4}
        width={WIDTH_A4}
        borderX="2px"
        borderY="2px"
        borderColor="base.divider.medium"
        bg="white"
      >
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
      </Box>
      {letterPublicId && (
        <Box
          borderX="2px"
          borderBottom="2px"
          borderColor="base.divider.medium"
          bgColor="grey.50"
          width="100%"
          paddingX="28px"
          paddingY="0.75rem"
        >
          <HStack spacing="0.25rem" alignItems="flex-start">
            <LetterQRCode
              qrCodeLinkValue={`${document.location.host}/letters/${letterPublicId}`}
            />
            <VStack
              spacing="0.25rem"
              alignItems="flex-start"
              style={{ margin: 'auto 10px' }}
            >
              <Text textColor="black" fontSize="sm">
                Letter ID: <b>{letterPublicId}</b>
              </Text>
              <Text textStyle="legal" textColor="grey.400">
                This letter is generated using {document.location.host}. Forging
                or morphing is a criminal offence.
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}
    </VStack>
  )
}
