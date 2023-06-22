import {
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { mapLetterToPublicDto } from 'core/dto-mappers/letter.dto-mapper'
import { LettersService } from 'letters/letters.service'

import { GetLetterPublicDto } from '~shared/dtos/letters.dto'

@Controller('public')
export class PublicController {
  constructor(private readonly lettersService: LettersService) {}

  @Get('letters/:publicId')
  async getLetterPublic(
    @Headers('password') password: string,
    @Param('publicId') publicId: string,
  ): Promise<GetLetterPublicDto> {
    const letter = await this.lettersService.findOneByPublicId(
      publicId,
      password,
    )
    if (!letter) throw new NotFoundException('letter not found')

    await this.lettersService.recordFirstReadAt(letter)
    return mapLetterToPublicDto(letter)
  }
}
