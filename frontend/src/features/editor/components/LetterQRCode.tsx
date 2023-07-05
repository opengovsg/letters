import { Box } from '@chakra-ui/react'
import QRCode from 'react-qr-code'

interface LetterQRCodeProps {
  qrCodeLinkValue: string
}

export const LetterQRCode = ({
  qrCodeLinkValue,
}: LetterQRCodeProps): JSX.Element => {
  return (
    <Box w="10%" h="10%">
      <QRCode
        size={12}
        style={{
          height: 'auto',
          maxWidth: '100%',
          width: '100%',
        }}
        value={qrCodeLinkValue}
      />
    </Box>
  )
}
