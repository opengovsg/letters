import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

import { ACCEPTED_SINGAPORE_PHONE_NUMBERS_REGEX } from '~shared/constants/regex'

import { ConfigService } from '../config/config.service'
import { Notification } from '../database/entities'
import { NotificationChannel } from '../types/notification'
import { TwilioClient } from './clients/twilio.client'

@Injectable()
export class SmsNotificationsService {
  constructor(
    private readonly smsClient: TwilioClient,
    @InjectPinoLogger(SmsNotificationsService.name)
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {}

  // We accept numbers in the following formats: +65x,65x,65-,+65-, or without country code x
  // This function returns a standardized phone number +65x
  standardizePhoneNumber(recipient: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const matches = ACCEPTED_SINGAPORE_PHONE_NUMBERS_REGEX.exec(
      recipient,
    ) as string[]

    if (!matches)
      throw new Error('Not in accepted Singapore phone number format')

    const phoneNumber = matches[2] // array with format: [Original string, Group 1 - one of +65|65|65-|+65-|undefined, Group 2 - phone number starting with 8 or 9]
    return `+65${phoneNumber}`
  }

  isInSmsAllowList(recipient: string): boolean {
    const smsAllowListString = this.config.get('smsAllowList')
    if (smsAllowListString === '*') return true
    const smsAllowList = smsAllowListString ? smsAllowListString.split(',') : []
    return smsAllowList.includes(recipient)
  }

  async send(
    templatedMessages: { message: string; letterId: number }[],
    recipients: string[],
  ): Promise<Partial<Notification>[]> {
    const sentMessages: Partial<Notification>[] = []

    await Promise.all(
      templatedMessages.map(async ({ message, letterId }, index) => {
        const recipient = recipients[index]
        const standardizedRecipient = this.standardizePhoneNumber(recipient)
        const logOnly = !this.isInSmsAllowList(standardizedRecipient)
        let messageSid
        try {
          messageSid = await this.smsClient.sendMessage(
            message,
            standardizedRecipient,
            logOnly,
          )
        } catch (error) {
          this.logger.error(error)
          // do nothing
        }
        sentMessages.push({
          channel: NotificationChannel.TWILIO as string,
          message,
          letterId,
          recipient,
          providerId: messageSid,
        })
      }),
    )
    return sentMessages
  }
}
