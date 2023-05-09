import { Module } from '@nestjs/common'

import { LettersModule } from '../letters/letters.module'
import { PublicController } from './public.controller'

@Module({
  imports: [LettersModule],
  controllers: [PublicController],
  exports: [],
})
export class PublicModule {}
