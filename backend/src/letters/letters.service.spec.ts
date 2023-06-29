import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { BatchesService } from '../batches/batches.service'
import { ConfigService } from '../config/config.service'
import {
  Batch,
  Letter,
  Notifications,
  Template,
  User,
} from '../database/entities'
import { TemplatesService } from '../templates/templates.service'
import { TemplatesParsingService } from '../templates/templates-parsing.service'
import { TemplatesSanitizationService } from '../templates/templates-sanitization.service'
import { LettersService } from './letters.service'
import { LettersEncryptionService } from './letters-encryption.service'
import { LettersNotificationsService } from './letters-notifications.service'
import { LettersRenderingService } from './letters-rendering.service'
import { LettersSanitizationService } from './letters-sanitization.service'
import { LettersValidationService } from './letters-validation.service'
import { TwilioService } from './twilio.service'

describe('LettersService', () => {
  let service: LettersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        LettersService,
        TemplatesService,
        TemplatesSanitizationService,
        TemplatesParsingService,
        TwilioService,
        BatchesService,
        LettersNotificationsService,
        LettersRenderingService,
        LettersSanitizationService,
        LettersValidationService,
        LettersEncryptionService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Letter), useValue: {} },
        { provide: getRepositoryToken(Template), useValue: {} },
        { provide: getRepositoryToken(Notifications), useValue: {} },
        { provide: getRepositoryToken(Batch), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile()

    service = module.get<LettersService>(LettersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
