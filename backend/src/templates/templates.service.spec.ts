import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionToken } from '@nestjs/typeorm'
import { PermissionsService } from './permissions.service'
import { TemplatesService } from './templates.service'

describe('TemplatesService', () => {
  let service: TemplatesService
  const mockConnection = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        PermissionsService,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile()

    service = module.get<TemplatesService>(TemplatesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
