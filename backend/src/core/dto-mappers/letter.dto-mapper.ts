import {
  GetBulkLettersDto,
  GetLetterDto,
  GetLetterPublicDto,
  LetterParamMaps,
} from '~shared/dtos/letters.dto'

import { Letter } from '../../database/entities'

export const mapLetterToPublicDto = (letter: Letter): GetLetterPublicDto => {
  return {
    publicId: letter.publicId,
    createdAt: letter.createdAt,
    issuedLetter: letter.issuedLetter,
  }
}

export const mapLetterToDto = (letter: Letter): GetLetterDto => {
  return {
    templateName: letter.template.name,
    publicId: letter.publicId,
    createdAt: letter.createdAt,
    issuedLetter: letter.issuedLetter,
  }
}

export const mapLetterToGetBulkLettersDto = (
  letterParams: LetterParamMaps,
  letters: Letter[],
): GetBulkLettersDto[] => {
  return letters.map((letter, index) => ({
    shortLink: letter.shortLink,
    createdAt: letter.createdAt.toDateString(),
    ...letterParams[index],
  }))
}
