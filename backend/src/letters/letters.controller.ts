import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { CreateLetterDto } from '../../../shared/src/dtos/create-letter.dto'
import { UpdateLetterDto } from '../../../shared/src/dtos/update-letter.dto'
import { LettersService } from './letters.service'

@Controller('letters')
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post()
  create(@Body() createLetterDto: CreateLetterDto) {
    return this.lettersService.create(createLetterDto)
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
