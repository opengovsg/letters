import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionToken } from '@nestjs/typeorm'
import { MemosService } from './memos.service'

describe('MemosService', () => {
  let service: MemosService
  const mockConnection = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemosService,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile()

    service = module.get<MemosService>(MemosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
