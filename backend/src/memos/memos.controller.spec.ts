import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionToken } from '@nestjs/typeorm'
import { MemosController } from './memos.controller'
import { MemosService } from './memos.service'

describe('MemosController', () => {
  let controller: MemosController
  const mockConnection = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemosController],
      providers: [
        MemosService,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile()

    controller = module.get<MemosController>(MemosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
