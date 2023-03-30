import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator'
import { TemplateBlock } from '../../types'

export class CreateTemplateDto {
  @IsNotEmpty()
  name!: string

  @IsArray()
  @ArrayNotEmpty()
  body!: TemplateBlock[]
}

export class CreateTemplateResponseDto {
  id!: number // template.id, not template_version.id
  version!: number // template_version.version
}
