import { IsDefined, IsString } from 'class-validator'

export class CreateTemplateDto {
  @IsDefined()
  @IsString()
  fields: string
  @IsDefined()
  @IsString()
  html: string
  @IsDefined()
  @IsString()
  name: string
  @IsDefined()
  @IsString()
  thumbnailS3Path: string
}

export class GetTemplateDto {
  id: number
  fields: string
  html: string
  name: string
  thumbnailS3Path: string
  createdAt: string
  updatedAt: string
}

export class UpdateTemplateDto {}
