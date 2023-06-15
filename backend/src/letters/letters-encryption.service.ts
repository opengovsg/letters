import { Injectable, NotAcceptableException } from '@nestjs/common'
import { AES, enc } from 'crypto-js'
import { Letter } from 'database/entities'

import { RenderedLetter } from './letters-rendering.service'

@Injectable()
export class LettersEncryptionService {
  encryptLetter(letter: RenderedLetter, password: string): RenderedLetter {
    return {
      fieldValues: AES.encrypt(letter.fieldValues, password).toString(),
      issuedLetter: AES.encrypt(letter.issuedLetter, password).toString(),
    }
  }

  decryptLetter(letter: Letter, password: string): Letter {
    const fieldValues = AES.decrypt(letter.fieldValues, password).toString(
      enc.Utf8,
    )
    const issuedLetter = AES.decrypt(letter.issuedLetter, password).toString(
      enc.Utf8,
    )

    // For short input and wrong decryption key AES removes all output (while removing padding).
    // More details: https://go.gov.sg/aes-padding
    if (fieldValues === '' && issuedLetter === '') {
      throw new Error('Invalid Key')
    }

    return {
      ...letter,
      fieldValues,
      issuedLetter,
    }
  }
}
