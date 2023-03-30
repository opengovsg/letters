import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'auth/auth.guard'
import { GetMemoMetaResponseDto } from 'memos/dto'
import { GetTemplateMetaResponseDto } from 'templates/dto'
import { ListMemosForUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * List templates that the user has access to
   */
  @Get(':id/templates')
  @ApiResponse({ type: [GetTemplateMetaResponseDto] })
  async listTemplates(
    @Param('id') _userId: number,
  ): Promise<GetTemplateMetaResponseDto[]> {
    const result = await this.usersService.listTemplates(_userId)
    return result
  }
  /**
   * List memos that the user has access to
   */
  @Get(':id/memos')
  @ApiResponse({ type: [GetMemoMetaResponseDto] })
  async listMemos(
    @Param('id') _userId: number,
    @Query() _query: ListMemosForUserDto,
  ): Promise<GetMemoMetaResponseDto[]> {
    const result = await this.usersService.listMemos(_userId, _query)
    return result
  }
}
