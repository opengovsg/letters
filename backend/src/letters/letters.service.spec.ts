import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { BatchesService } from '../batches/batches.service'
import { Batch, Letter, Template } from '../database/entities'
import { TemplatesService } from '../templates/templates.service'
import { LettersService } from './letters.service'
import { LettersEncryptionService } from './letters-encryption.service'
import { LettersRenderingService } from './letters-rendering.service'
import { LettersSanitizationService } from './letters-sanitization.service'
import { LettersValidationService } from './letters-validation.service'

describe('LettersService', () => {
  let service: LettersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LettersService,
        TemplatesService,
        BatchesService,
        LettersRenderingService,
        LettersSanitizationService,
        LettersValidationService,
        LettersEncryptionService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Letter), useValue: {} },
        { provide: getRepositoryToken(Template), useValue: {} },
        { provide: getRepositoryToken(Batch), useValue: {} },
      ],
    }).compile()

    service = module.get<LettersService>(LettersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
