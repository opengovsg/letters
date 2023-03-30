import { User } from 'database/entities'
import { TemplateBlock } from 'types'

export class GetMemoResponseDto {
  id!: number
  issuer!: User
  slug!: string

  uin!: string
  uinType!: string

  expiresAt?: Date
  isViewed!: boolean
  isVoid!: boolean
  voidReason?: string

  body!: TemplateBlock[]
}

export class GetMemoMetaResponseDto {
  id!: number
  issuer!: User
  slug!: string
  createdAt!: Date // issued at

  template!: string // Name of template for this memo

  // Details that we might eventually want to display on dashboard.
  // expiresAt?: Date
  // isViewed!: boolean
  // isVoid!: boolean
}
