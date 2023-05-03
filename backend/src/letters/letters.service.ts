import { Injectable } from '@nestjs/common'

import { CreateLetterDto } from '~shared/dtos/create-letter.dto'
import { UpdateLetterDto } from '~shared/dtos/update-letter.dto'

@Injectable()
export class LettersService {
  create(createLetterDto: CreateLetterDto) {
    return 'This action adds a new letter'
  }

  findAll() {
    return `This action returns all letters`
  }

  findOne(id: number) {
    return `This action returns a #${id} letter`
  }

  update(id: number, updateLetterDto: UpdateLetterDto) {
    return `This action updates a #${id} letter`
  }

  remove(id: number) {
    return `This action removes a #${id} letter`
  }
}
