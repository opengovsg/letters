import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import twilio from 'twilio'

import { ConfigService } from '../../config/config.service'

@Injectable()
export class TwilioClient {
  constructor(
    private readonly config: ConfigService,
    @InjectPinoLogger(TwilioClient.name)
    private readonly logger: PinoLogger,
  ) {}

  private getLogOnlyClient() {
    return {
      messages: {
        create: ({ body, to }: { body: string; to: string }) => {
          this.logger.info(
            `SMS sending is not enabled in this environment or this recipient is not in the allowed list.\
             Message: ${body} Recipient: ${to}`,
          )
          return Promise.resolve({
            sid: `DEV_MODE_NO_SMS_SENT_${randomUUID().substring(0, 13)}`,
          })
        },
      },
    }
  }

  private getClient() {
    const accountSid = this.config.get('twilioApi.accountSid')
    const authToken = this.config.get('twilioApi.authToken')
    const messagingServiceSid = this.config.get('twilioApi.messagingServiceSid')

    if (!accountSid || !authToken || !messagingServiceSid) {
      return this.getLogOnlyClient()
    }

    return twilio(accountSid, authToken)
  }

  private client = this.getClient()

  async sendMessage(
    message: string,
    recipient: string,
    logOnly = false,
  ): Promise<string> {
    this.logger.info(`Sending sms to ${recipient}`)

    let response
    if (logOnly) {
      response = await this.getLogOnlyClient().messages.create({
        body: message,
        to: recipient,
      })
    } else {
      response = await this.client.messages.create({
        messagingServiceSid: this.config.get('twilioApi.messagingServiceSid'),
        body: message,
        to: recipient,
      })
    }

    return response.sid
  }
}
