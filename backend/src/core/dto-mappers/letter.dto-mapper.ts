import { GetLetterDto } from '~shared/dtos/get-letter.dto'

import { Letter } from '../../database/entities'

export const mapLetterToDto = (letter: Letter): GetLetterDto => {
  return {
    publicId: letter.publicId,
    createdAt: letter.createdAt,
    issuedLetter: letter.issuedLetter,
  }
}
