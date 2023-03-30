import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { getConnectionToken } from '@nestjs/typeorm'
import { MemosService } from 'memos/memos.service'
import { TemplatesService } from 'templates/templates.service'

describe('UsersController', () => {
  let controller: UsersController
  const mockConnection = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
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

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
