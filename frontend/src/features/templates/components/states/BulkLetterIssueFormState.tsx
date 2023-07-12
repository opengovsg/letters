import {
  CitizenNotificationMethod,
  CreateBulkLetterDto,
} from '~shared/dtos/letters.dto'

export class BulkLetterIssueFormState {
  passwordInstructions?: string
  notificationMethod: CitizenNotificationMethod
  isPasswordProtected: boolean
  letterGenerationObject: CreateBulkLetterDto
}
