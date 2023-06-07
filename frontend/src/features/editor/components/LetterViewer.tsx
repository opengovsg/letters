import { Box, BoxProps, Spinner } from '@chakra-ui/react'

import { sanitizeHtml } from '~shared/util/html-sanitizer'

interface LetterViewerProps extends BoxProps {
  html: string | undefined
  isLoading: boolean
}

export const LetterViewer = ({
  html,
  isLoading,
  ...styleProps
}: LetterViewerProps): JSX.Element => {
  if (isLoading || !html) {
    return <Spinner />
  }
  const cleanHtml = sanitizeHtml(html)

  return (
    <Box {...styleProps} border="1px" borderColor="grey.200" bg="white">
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
    </Box>
  )
}
