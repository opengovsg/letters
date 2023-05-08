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
  CreateBulkLetterDto,
  CreateLetterDto,
  GetLetterDto,
  UpdateLetterDto,
} from '~shared/dtos/letters.dto'

import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../core/decorators/current-user.decorator'
import { mapLetterToDto } from '../core/dto-mappers/letter.dto-mapper'
import { User } from '../database/entities'
import { LettersService } from './letters.service'

@UseGuards(AuthGuard)
@Controller('letters')
export class LettersController {
	constructor(private readonly lettersService: LettersService) {}

	@Post()
	create(@Body() createLetterDto: CreateLetterDto) {
		return this.lettersService.create(createLetterDto);
	}

  @Post('bulks')
  async bulk(
    @CurrentUser() user: User,
    @Body() bulkRequest: CreateBulkLetterDto,
  ): Promise<GetLetterDto[]> {
    const letters = await this.lettersService.bulkCreate(user.id, bulkRequest)
    return letters.map(mapLetterToDto)
  }

  @Get()
  findAll() {
    return this.lettersService.findAll()
  }

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.lettersService.findOne(+id);
	}

	@Get("/public/:publicId")
	async findByPublicId(@Param("publicId") id: string) {
		const letter = await this.lettersService.findByPublicId(id);
		return mapLetterToDto(letter);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateLetterDto: UpdateLetterDto) {
		return this.lettersService.update(+id, updateLetterDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.lettersService.remove(+id);
	}
}
