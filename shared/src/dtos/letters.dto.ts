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

export interface BulkRequestBody {
  templateId: number
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
