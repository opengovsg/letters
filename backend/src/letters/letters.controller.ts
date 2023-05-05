import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm' // To be deleted
import { Repository } from 'typeorm' // To be deleted

import { CreateLetterDto, UpdateLetterDto } from '~shared/dtos/letters.dto'

import { Template } from '../database/entities' // To be deleted
import { TemplatesService } from '../templates/templates.service'
import { CustomBulkError } from '../types/errors'
import { LettersService } from './letters.service'
import { ValidationService } from './letters-validation.service'

export type JsonStreamObject = Array<{ [key: string]: string }>

interface BulkRequestBody {
  templateId: number
  jsonStream: JsonStreamObject
}

@Controller('letters')
export class LettersController {
  constructor(
    @InjectRepository(Template) // To be deleted
    private readonly repository: Repository<Template>, // To be deleted
    private readonly lettersService: LettersService,
    private readonly validationService: ValidationService,
    private readonly templatesService: TemplatesService,
  ) {}

  @Post()
  create(@Body() createLetterDto: CreateLetterDto) {
    return this.lettersService.create(createLetterDto)
  }

  @Post('bulk')
  async createBulk(@Body() { templateId, jsonStream }: BulkRequestBody) {
    try {
      // TODO: Call from templatesService to find template
      // const template = this.templatesService.findOne(templateId)
      const template = await this.repository.findOne({
        where: { id: templateId },
      })

      if (!template) throw new BadRequestException('Unable to find template')

      this.validationService.bulkValidation(jsonStream, template.fields)

      // TODO: Bulk creation
      return { message: 'Bulk create success' }
    } catch (e) {
      if (typeof e === 'object' && e !== null) {
        const customError = e as CustomBulkError

        if (customError.details) {
          throw new BadRequestException({
            message: customError.message,
            details: customError.details,
          })
        } else {
          throw new BadRequestException(customError.message)
        }
      }
    }
  }

  @Get()
  findAll() {
    return this.lettersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lettersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLetterDto: UpdateLetterDto) {
    return this.lettersService.update(+id, updateLetterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lettersService.remove(+id)
  }
}
