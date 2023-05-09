import { Box, Spinner } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'

interface LetterViewerProps {
  htmlLetter: string | undefined
  isLoading: boolean
}

export const LetterViewer = ({
  htmlLetter,
  isLoading,
}: LetterViewerProps): JSX.Element => (
  <>
    {isLoading || !htmlLetter ? (
      <Spinner />
    ) : (
      <Box border="1px" borderColor="grey.200" p={8} bg="white">
        <Editor
          disabled={true}
          initialValue={htmlLetter}
          init={{
            inline: true,
          }}
        />
      </Box>
    )}
  </>
)
