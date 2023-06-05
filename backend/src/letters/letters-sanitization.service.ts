import { Injectable } from '@nestjs/common'

import { CreateLetterDto } from '~shared/dtos/letters.dto'
import { sanitizeHtml } from '~shared/util/html-sanitizer'

@Injectable()
export class LettersSanitizationService {
  sanitizeLetter(createLetterDto: CreateLetterDto): CreateLetterDto {
    return {
      ...createLetterDto,
      issuedLetter: sanitizeHtml(createLetterDto.issuedLetter),
    }
  }
}
