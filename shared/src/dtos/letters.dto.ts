import { IsArray, IsDefined, IsNumber, IsOptional } from 'class-validator'

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
  @IsOptional()
  @IsArray()
  passwords?: string[]
  @IsOptional()
  @IsArray()
  phoneNumbers?: string[]
}

export enum BulkLetterValidationResultErrorMessage {
  INVALID_ATTRIBUTE = 'Invalid attribute in param',
  MISSING_PARAM = 'Missing param',
}

export class BulkLetterValidationResultError {
  id: number
  param: string
  message: BulkLetterValidationResultErrorMessage
}

export class BulkLetterValidationResultDto {
  success: boolean
  message: string
  errors?: BulkLetterValidationResultError[]
}

export class GetLetterPublicDto {
  publicId: string
  issuedLetter: string
  createdAt: Date
  firstReadAt: Date
}

export class GetLetterDto {
  templateName: string
  publicId: string
  createdAt: string
  firstReadAt: string
  issuedLetter: string
  isPasswordProtected: boolean
}

export class GetLettersDto {
  letters: GetLetterDto[]
  count: number
}

export class GetBulkLetterDto {
  publicId: string
  createdAt: string;
  [key: string]: string
}
