import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Editor, Issuer, Template, TemplateVersion } from 'database/entities'
import { PermissionsService } from './permissions.service'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([Template, TemplateVersion, Editor, Issuer]),
  ],
  controllers: [TemplatesController],
  providers: [PermissionsService, TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
