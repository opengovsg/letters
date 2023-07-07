export class UpdateBatchDto {}

export class CreateBatchDto {
  userId: number
  templateId: number
  rawCsv: string
  passwordInstructions: string
}
