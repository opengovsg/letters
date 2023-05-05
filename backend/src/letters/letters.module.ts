import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Template } from '../database/entities' // To be deleted
import { TemplatesService } from '../templates/templates.service'
import { LettersController } from './letters.controller'
import { LettersService } from './letters.service'
import { ValidationService } from './letters-validation.service'

@Module({
  controllers: [LettersController],
  providers: [LettersService, ValidationService, TemplatesService],
  imports: [TypeOrmModule.forFeature([Template])], // To be deleted
})
export class LettersModule {}
