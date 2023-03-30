import { Injectable } from '@nestjs/common'
import { TemplatesService } from 'templates/templates.service'
import { MemosService } from 'memos/memos.service'
import { GetTemplateMetaResponseDto } from 'templates/dto'
import { ListMemosForUserDto } from './dto'
import { GetMemoMetaResponseDto } from 'memos/dto'
@Injectable()
export class UsersService {
  constructor(
    private memosService: MemosService,
    private templatesService: TemplatesService,
  ) {}

  async listMemos(
    userId: number,
    query: ListMemosForUserDto,
  ): Promise<GetMemoMetaResponseDto[]> {
    const result = this.memosService.listMemosForUser(userId, query)
    return result
  }
  async listTemplates(userId: number): Promise<GetTemplateMetaResponseDto[]> {
    const result = this.templatesService.listTemplatesForUser(userId)
    return result
  }
}
