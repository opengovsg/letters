import { Injectable } from '@nestjs/common'
import twilio from 'twilio'

import { ConfigService } from '../config/config.service'

@Injectable()
export class TwilioService {
  constructor(private readonly configService: ConfigService) {}

  async sendMessage(message: string, recipient: string): Promise<string> {
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
