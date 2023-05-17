import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { ConfigService } from './config.service'

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/:id')
  findById(@Param('id') id: string): string {
    const value = this.configService.findOneById(id)
    if (!value) throw new BadRequestException()
    return value
  }
}
