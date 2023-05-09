import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { Batch } from '../database/entities'
import { BatchesService } from './batches.service'

describe('BatchesService', () => {
  let service: BatchesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchesService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Batch), useValue: {} },
      ],
    }).compile()

    service = module.get<BatchesService>(BatchesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
