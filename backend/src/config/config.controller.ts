import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common'

import { AuthGuard } from '../auth/auth.guard'
import { ConfigService } from './config.service'

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/tinymceApiKey')
  @UseGuards(AuthGuard)
  getTinymceApiKey() {
    return this.configService.getTinymceApiKey()
  }

  @Get('/:id')
  findById(@Param('id') id: string): string {
    const value = this.configService.findOneById(id)
    if (!value) throw new BadRequestException()
    return value
  }
}
