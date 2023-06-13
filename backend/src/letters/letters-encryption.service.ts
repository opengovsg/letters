import { Injectable } from '@nestjs/common'
import { AES } from 'crypto-js'

import { RenderedLetter } from './letters-rendering.service'

@Injectable()
export class LettersEncryptionService {
  encryptLetters(letter: RenderedLetter, password: string): RenderedLetter {
    return {
      fieldValues: AES.encrypt(letter.fieldValues, password).toString(),
      issuedLetter: AES.encrypt(letter.issuedLetter, password).toString(),
    }
  }
}
