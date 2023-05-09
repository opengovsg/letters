import { VStack } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

import { useLetterPublicId } from './hooks/letters.hooks'

export const LetterPublicPage = (): JSX.Element => {
  const html = `<p><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://file.go.gov.sg/pub-wwd-2023.png" width="377" height="379"></span></p>
  <p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183); font-size: 24px;">Certificate of&nbsp;</span></p>
  <p style="text-align: center;"><span style="font-size: 40px;"><strong><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">Appreciation</span></strong></span></p>
  <p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">presented to</span></p>
  <p style="text-align: center;">&nbsp;</p>
  <p style="text-align: center;"><strong><span style="color: rgb(48, 113, 183); font-size: 20px;">Nicholas Ong</span></strong></p>
  <p style="text-align: center;">&nbsp;</p>
  <p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">for supporting</span></p>
  <p style="text-align: center;"><span style="font-size: 20px;"><strong><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">Singapore World Water Day 2023</span></strong></span></p>
  <p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183); text-decoration: underline;"><img src="https://file.go.gov.sg/pub-wwd-2023-signature.png" width="170" height="115"></span></p>
  <p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">Cindy Keng</span></p>
  <p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">Director, 3P Network</span></p>
  <p style="text-align: center;">&nbsp;</p>
  <p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);"><img src="https://file.go.gov.sg/pub-wwd-2023-footer.png" width="832" height="20"></span></p>`

  const editorRef = useRef(null)

  return (
    <VStack alignItems="left" spacing="0px">
      <VStack padding={16} spacing={8} align={'center'}>
        <Editor
          disabled={true}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            toolbar: false,
            init_instance_callback: function (editor) {
              editor.setContent(html)
            },
            inline: true,
            content_css: false,
            skin: false,
          }}
        />
      </VStack>
    </VStack>
  )
}
