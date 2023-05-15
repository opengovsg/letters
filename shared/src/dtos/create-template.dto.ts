import { IsArray, IsDefined, IsString } from 'class-validator'

export class CreateTemplateDto {
  @IsDefined()
  @IsArray()
  fields: string[]
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
