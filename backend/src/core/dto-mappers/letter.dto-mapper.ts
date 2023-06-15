import {
  GetBulkLetterDto,
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
    createdAt: letter.createdAt.toDateString(),
    isPasswordProtected: letter.isPasswordProtected,
    issuedLetter: letter.issuedLetter,
  }
}

export const mapLetterToGetBulkLetterDto = (
  letterParams: LetterParamMaps,
  letters: Letter[],
  passwords?: string[],
): GetBulkLetterDto[] => {
  const getBulkLetterDtos = letters.map((letter, index) => ({
    ...letterParams[index],
    createdAt: letter.createdAt.toDateString(),
    publicId: letter.publicId,
  }))

  return !passwords
    ? getBulkLetterDtos
    : getBulkLetterDtos.map((dtos, index) => ({
        ...dtos,
        Password: passwords[index], // Capitalized as it is what the user expects
      }))
}
