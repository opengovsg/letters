import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../auth/auth.module'
import { BatchesModule } from '../batches/batches.module'
import { Letter } from '../database/entities' // To be deleted
import { TemplatesModule } from '../templates/templates.module'
import { LettersController } from './letters.controller'
import { LettersService } from './letters.service'
import { LettersEncryptionService } from './letters-encryption.service'
import { LettersRenderingService } from './letters-rendering.service'
import { LettersSanitizationService } from './letters-sanitization.service'
import { LettersValidationService } from './letters-validation.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Letter]),
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
  ],
  exports: [LettersService, TypeOrmModule],
})
export class LettersModule {}
