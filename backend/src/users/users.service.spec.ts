import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionToken } from '@nestjs/typeorm'
import { MemosService } from 'memos/memos.service'
import { TemplatesService } from 'templates/templates.service'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  const mockConnection = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // TODO fix: external services should be imports but nest seems unable to resolve the deps (?)
      providers: [
        UsersService,
        MemosService,
        TemplatesService,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
