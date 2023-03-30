import { Test, TestingModule } from '@nestjs/testing'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
import { PermissionsService } from './permissions.service'
import { getConnectionToken } from '@nestjs/typeorm'

describe('TemplatesController', () => {
  let controller: TemplatesController
  const mockConnection = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [
        TemplatesService,
        PermissionsService,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile()

    controller = module.get<TemplatesController>(TemplatesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
