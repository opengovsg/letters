import { IsEmail, Validate } from 'class-validator'
import { IsStringEndsWith } from 'validators/IsStringEndsWith'

export class GenerateOtpDto {
  /**
   * Email of government officer
   * @example example@example.gov.sg
   */
  @IsEmail()
  @Validate(IsStringEndsWith, ['.gov.sg'], {
    message: 'Invalid email. Only government officers can login.',
  })
  email!: string
}
