import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../auth/auth.module'
import { BatchesModule } from '../batches/batches.module'
import { Letter } from '../database/entities' // To be deleted
import { TemplatesModule } from '../templates/templates.module'
import { LettersController } from './letters.controller'
import { LettersService } from './letters.service'
import { LettersRenderingService } from './letters-rendering.service'
import { ValidationService } from './letters-validation.service'
import {ExternalServicesModule} from "../external-services/external-services.module";
import {LinkShortenterService} from "../external-services/link-shortenter.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Letter]),
    AuthModule,
    BatchesModule,
    TemplatesModule,
    ExternalServicesModule
  ],
  controllers: [LettersController],
  providers: [LettersService, ValidationService, LettersRenderingService, LinkShortenterService],
  exports: [LettersService, TypeOrmModule],
})
export class LettersModule {}
