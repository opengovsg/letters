import { GetLetterDto } from '~shared/dtos/letters.dto'

import { Letter } from '../../database/entities'

export const mapLetterToDto = (letter: Letter): GetLetterDto => {
  return {
    id: letter.id,
    batchId: letter.batchId,
    publicId: letter.publicId,
    templateId: letter.templateId,
    userId: letter.userId,
    issuedLetter: letter.issuedLetter,
    shortLink: letter.shortLink,
    createdAt: letter.createdAt.toISOString(),
  }
}
