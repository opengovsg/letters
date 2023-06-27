import { Text } from '@chakra-ui/react'
import QRCode from 'react-qr-code'

interface LetterQRCodeProps {
  qrCodeLinkValue: string
}

export const LetterQRCode = ({
  qrCodeLinkValue,
}: LetterQRCodeProps): JSX.Element => {
  return (
    <div style={{ margin: 'auto', padding: '25px' }}>
      <hr />
      <Text>
        This letter was retrieved from <b>{qrCodeLinkValue}</b>
      </Text>
      <div
        style={{
          height: '25%',
          width: '25%',
          margin: 'auto',
        }}
      >
        <QRCode
          size={12}
          style={{
            height: 'auto',
            maxWidth: '100%',
            width: '100%',
          }}
          value={qrCodeLinkValue}
        />
      </div>
    </div>
  )
}
