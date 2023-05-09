import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'

import {
  BulkRequestBody,
  CreateLetterDto,
  UpdateLetterDto,
} from '~shared/dtos/letters.dto'

import { CurrentUser } from '../../build/core/decorators/current-user.decorator'
import { AuthGuard } from '../auth/auth.guard'
import { mapLetterToDto } from '../core/dto-mappers/letter.dto-mapper'
import { User } from '../database/entities' // To be deleted
import { LettersService } from './letters.service'
import { ValidationService } from './letters-validation.service'

@UseGuards(AuthGuard)
@Controller('letters')
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post()
  create(@Body() createLetterDto: CreateLetterDto) {
    return this.lettersService.create(createLetterDto, undefined)
  }

  @Post('bulks')
  async bulk(@CurrentUser() user: User, @Body() bulkRequest: BulkRequestBody) {
    const letters = await this.lettersService.bulkCreate(user.id, bulkRequest)
    return letters.map(mapLetterToDto)
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
