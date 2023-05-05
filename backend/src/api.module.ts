import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { TerminusModule } from '@nestjs/terminus'

import { AuthModule } from './auth/auth.module'
import { BatchesModule } from './batches/batches.module'
import { HealthModule } from './health/health.module'
import { LettersModule } from './letters/letters.module'
import { MailerModule } from './mailer/mailer.module'
import { OtpModule } from './otp/otp.module'
import { TemplatesModule } from './templates/templates.module'

const apiModules = [
  AuthModule,
  TerminusModule,
  HealthModule,
  OtpModule,
  MailerModule,
  LettersModule,
  TemplatesModule,
  BatchesModule,
]

@Module({
  imports: [
    ...apiModules,
    RouterModule.register([
      {
        path: 'api',
        children: apiModules,
      },
    ]),
  ],
})
export class ApiModule {}
