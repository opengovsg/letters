import { CitizenNotificationMethod } from '~shared/dtos/letters.dto'

export class BulkLetterIssueFormState {
  passwordInstructions?: string
  notificationMethod: CitizenNotificationMethod
  isPasswordProtected: boolean
}
