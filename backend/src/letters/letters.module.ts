import { Module } from '@nestjs/common'

import { LettersController } from './letters.controller'
import { LettersService } from './letters.service'

@Module({
  controllers: [LettersController],
  providers: [LettersService],
})
export class LettersModule {}
