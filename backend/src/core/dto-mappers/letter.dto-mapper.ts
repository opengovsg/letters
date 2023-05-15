import { GetLetterPublicDto } from '~shared/dtos/letters.dto'

import { Letter } from '../../database/entities'

export const mapLetterToPublicDto = (letter: Letter): GetLetterPublicDto => {
  return {
    publicId: letter.publicId,
    createdAt: letter.createdAt,
    issuedLetter: letter.issuedLetter,
  }
}
