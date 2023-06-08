import { Injectable } from '@nestjs/common'

import { sanitizeHtml } from '~shared/util/html-sanitizer'

import { RenderedLetter } from './letters-rendering.service'

@Injectable()
export class LettersSanitizationService {
  sanitizeLetter(letter: RenderedLetter): RenderedLetter {
    return {
      ...letter,
      issuedLetter: sanitizeHtml(letter.issuedLetter),
    }
  }
}
