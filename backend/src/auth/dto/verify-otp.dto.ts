import { IsNumberString, Length } from 'class-validator'
import { GenerateOtpDto } from './generate-otp.dto'

export class VerifyOtpDto extends GenerateOtpDto {
  /**
   * One time password
   * @example 000000
   */
  @Length(6, 6)
  @IsNumberString()
  token!: string
}
