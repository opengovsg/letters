import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { BatchesService } from '../batches/batches.service'
import { Batch, Letter, Template } from '../database/entities'
import { TemplatesService } from '../templates/templates.service'
import { LettersService } from './letters.service'

describe('LettersService', () => {
  let service: LettersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LettersService,
        TemplatesService,
        BatchesService,
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
