import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import twilio from 'twilio'

import { ConfigService } from '../../config/config.service'
import { generatePublicId } from '../../core/utils'

@Injectable()
export class TwilioService {
  constructor(
    private readonly config: ConfigService,
    @InjectPinoLogger(TwilioService.name)
    private readonly logger: PinoLogger,
  ) {}

  private getClient() {
    const accountSid = this.config.get('twilioApi.accountSid')
    const authToken = this.config.get('twilioApi.authToken')
    const messagingServiceSid = this.config.get('twilioApi.messagingServiceSid')

    if (accountSid && authToken && messagingServiceSid) {
      return twilio(accountSid, authToken)
    }

    return {
      messages: {
        create: ({ body, to }: { body: string; to: string }) => {
          this.logger.info(
            `Development mode: No SMS sent. Logging SMS: ${body} sent to ${to} `,
          )
          return Promise.resolve({
            sid: `DEV_MODE_NO_SMS_SENT_${generatePublicId().substring(0, 13)}`,
          })
        },
      },
    }
  }
  private client = this.getClient()

  async sendMessage(message: string, recipient: string): Promise<string> {
    // TODO: Add allow-listed phone numbers for dev testing
    this.logger.info(`Sending sms to ${recipient}`)
    const response = await this.client.messages.create({
      messagingServiceSid: this.config.get('twilioApi.messagingServiceSid'),
      body: message,
      to: recipient,
    })

    return response.sid
  }
}
