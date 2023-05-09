export class CreateLetterDto {
  userId: number
  batchId: number
  templateId: number
  issuedLetter: string
  fieldValues: string
  shortLink: string
}
