import { IsDefined, IsNumber } from 'class-validator'

export class CreateLetterDto {
  userId: number
  batchId: number
  templateId: number
  issuedLetter: string
  fieldValues: string
  shortLink: string
}
export class UpdateLetterDto {}

export type LetterParamMaps = Array<{ [key: string]: string }>

export class CreateBulkLetterDto {
  @IsDefined()
  @IsNumber()
  templateId: number
  @IsDefined()
  letterParamMaps: LetterParamMaps
}

export class GetLetterDto {
  id: number
  batchId: number
  publicId: string
  templateId: number
  userId: number
  issuedLetter: string
  shortLink: string
  createdAt: string
}

export class GetLetterPublicDto {
  publicId: string
  issuedLetter: string
  createdAt: Date
}
