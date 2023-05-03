import { Test, TestingModule } from '@nestjs/testing'

import { BatchesService } from './batches.service'

describe('BatchesService', () => {
  let service: BatchesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchesService],
    }).compile()

    service = module.get<BatchesService>(BatchesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
