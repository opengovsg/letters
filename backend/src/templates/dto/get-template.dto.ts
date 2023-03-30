import { TemplateBlock, TemplateStatus } from 'types'

export class GetTemplateResponseDto {
  id!: number
  version!: number
  status!: TemplateStatus
  author!: number
  editor!: number

  name!: string
  body!: TemplateBlock[]
  paramsRequired!: string[]
}

export class GetTemplateMetaResponseDto {
  id!: number
  status!: TemplateStatus
  editor!: number // Last edited by

  isEditor!: boolean // Can user edit
  isIssuer!: boolean

  name!: string
  updatedAt!: Date
}
