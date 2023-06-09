import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'

import {
  CreateBulkLetterDto,
  CreateLetterDto,
  GetBulkLetterDto,
  GetLettersDto,
  UpdateLetterDto,
} from '~shared/dtos/letters.dto'

import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../core/decorators/current-user.decorator'
import {
  mapLetterToDto,
  mapLetterToGetBulkLetterDto,
  mapLetterToPublicDto,
} from '../core/dto-mappers/letter.dto-mapper'
import { User } from '../database/entities'
import { LettersService } from './letters.service'

@UseGuards(AuthGuard)
@Controller('letters')
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post()
  create(@Body() createLetterDto: CreateLetterDto) {
    return this.lettersService.create(createLetterDto)
  }

  @Post('bulks')
  async bulk(
    @CurrentUser() user: User,
    @Body() bulkRequest: CreateBulkLetterDto,
  ): Promise<GetBulkLetterDto[]> {
    const letters = await this.lettersService.bulkCreate(user.id, bulkRequest)
    return mapLetterToGetBulkLetterDto(
      bulkRequest.letterParamMaps,
      letters,
      bulkRequest.passwords,
    )
  }

  @Get()
  async findAndCount(
    @CurrentUser() user: User,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<GetLettersDto> {
    // TODO: add query param 'sort', currently it defaults to reverse chronological order
    const [letters, count] = await this.lettersService.findAndCount(
      user.id,
      limit,
      offset,
    )
    return {
      letters: letters.map(mapLetterToDto),
      count: count,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lettersService.findOne(+id)
  }

  @Get('/public/:publicId') // Do we still use/need this?
  async findByPublicId(@Param('publicId') id: string) {
    const letter = await this.lettersService.findOneByPublicId(id)
    return mapLetterToPublicDto(letter)
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
