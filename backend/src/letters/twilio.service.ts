import { Injectable } from '@nestjs/common'
import { generatePublicId } from 'core/utils'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import twilio from 'twilio'

import { ConfigService } from '../config/config.service'

@Injectable()
export class TwilioService {
  constructor(
    private readonly configService: ConfigService,
    @InjectPinoLogger(TwilioService.name)
    private readonly logger: PinoLogger,
  ) {}

  async sendMessage(message: string, recipient: string): Promise<string> {
    // Todo: add allow-listed phone numbers for dev testing
    if (!this.configService.isProdEnv) {
      this.logger.info('Development mode: No SMS sent')
      return Promise.resolve(
        `DEV_MODE_NO_SMS_SENT_${generatePublicId().substring(0, 13)}`,
      )
    }

    const client = twilio(
      this.configService.get('twilioApiKey.accountSid'),
      this.configService.get('twilioApiKey.authToken'),
    )

    // TODO: Handle sms creation with sender ID
    const response = await client.messages.create({
      body: message,
      from: '',
      to: recipient,
    })

    return response.sid
  }
}
