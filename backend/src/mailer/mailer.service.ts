import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import nodemailer, { SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer'
import { PostmanNodemailerTransport } from '@opengovsg/postmangovsg-client'

import { ConfigService } from '../config/config.service'

@Injectable()
export class MailerService {
  constructor(
    private config: ConfigService,
  ) {}

  private mailer: Pick<Transporter, 'sendMail'> = !this.config.isDevEnv
    ? nodemailer.createTransport(
        new PostmanNodemailerTransport(this.config.get('postman.apiKey')),
      )
    : nodemailer.createTransport({
        ...this.config.get('mailer'),
        secure: !this.config.isDevEnv,
        ignoreTLS: this.config.isDevEnv,
      })

  sendMail = async (mailOptions: SendMailOptions): Promise<SentMessageInfo> => {
    Logger.log('Sending mail')
    return this.mailer.sendMail(mailOptions)
  }
}

