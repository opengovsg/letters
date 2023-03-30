import {
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator'
import { UinType } from 'database/entities'
export class CreateMemoDto {
  @IsNotEmpty()
  templateId!: number

  @IsOptional()
  versionId?: number

  @IsNotEmpty()
  // TODO: Create a validator for UINs?
  uin!: string

  @IsNotEmpty()
  uinType!: UinType

  @IsNotEmptyObject()
  params!: Record<string, string>

  @IsOptional()
  @IsDateString()
  expiresAt?: string
}

export class CreateMemoResponseDto {
  slug!: string
}
