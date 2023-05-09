import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { mapLetterToPublicDto } from 'core/dto-mappers/letter.dto-mapper'
import { LettersService } from 'letters/letters.service'

import { GetLetterPublicDto } from '~shared/dtos/get-letter.dto'

@Controller()
export class PublicController {
  constructor(private readonly lettersService: LettersService) {}

  @Get('letters/:publicId')
  async getletterPublic(
    @Param('publicId') publicId: string,
  ): Promise<GetLetterPublicDto> {
    const letter = await this.lettersService.findOneByPublicId(publicId)
    if (!letter) throw new NotFoundException('letter not found')

    return mapLetterToPublicDto(letter)
  }
}
