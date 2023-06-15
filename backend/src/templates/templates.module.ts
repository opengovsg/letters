import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../auth/auth.module'
import { Template } from '../database/entities'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
import { TemplatesParsingService } from './templates-parsing.service'

@Module({
  imports: [TypeOrmModule.forFeature([Template]), AuthModule],
  controllers: [TemplatesController],
  providers: [TemplatesService, TemplatesParsingService],
  exports: [TemplatesService, TypeOrmModule],
})
export class TemplatesModule {}
