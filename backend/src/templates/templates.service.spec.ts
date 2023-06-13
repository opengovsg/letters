import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { Template } from '../database/entities'
import { TemplatesService } from './templates.service'
import { TemplatesParsingService } from './templates-parsing.service'

describe('TemplatesService', () => {
  let service: TemplatesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        TemplatesParsingService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Template), useValue: {} },
      ],
    }).compile()

    service = module.get<TemplatesService>(TemplatesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
