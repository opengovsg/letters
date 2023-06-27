import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../auth/auth.module'
import { BatchesModule } from '../batches/batches.module'
import { Letter, Notifications, User } from '../database/entities'
import { TemplatesModule } from '../templates/templates.module'
import { LettersController } from './letters.controller'
import { LettersService } from './letters.service'
import { LettersEncryptionService } from './letters-encryption.service'
import { LettersNotificationsService } from './letters-notifications.service'
import { LettersRenderingService } from './letters-rendering.service'
import { LettersSanitizationService } from './letters-sanitization.service'
import { LettersValidationService } from './letters-validation.service'
import { TwilioService } from './twilio.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Letter]),
    TypeOrmModule.forFeature([Notifications]),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    BatchesModule,
    TemplatesModule,
  ],
  controllers: [LettersController],
  providers: [
    LettersService,
    LettersValidationService,
    LettersRenderingService,
    LettersSanitizationService,
    LettersEncryptionService,
    LettersNotificationsService,
    TwilioService,
  ],
  exports: [LettersService, TypeOrmModule],
})
export class LettersModule {}
