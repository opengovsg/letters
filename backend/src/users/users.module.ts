import { Module } from '@nestjs/common'
import { MemosModule } from 'memos/memos.module'
import { TemplatesModule } from 'templates/templates.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
@Module({
  imports: [MemosModule, TemplatesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
