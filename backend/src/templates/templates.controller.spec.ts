import { Test, TestingModule } from '@nestjs/testing'

import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
import { TemplatesParsingService } from './templates-parsing.service'
import { TemplatesSanitizationService } from './templates-sanitization.service'

describe('TemplatesController', () => {
  let controller: TemplatesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [
        { provide: TemplatesService, useValue: {} },
        TemplatesParsingService,
        TemplatesSanitizationService,
      ],
    }).compile()

    controller = module.get<TemplatesController>(TemplatesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
