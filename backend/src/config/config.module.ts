import { Global, Module } from '@nestjs/common'

import { ConfigController } from './config.controller'
import { ConfigService } from './config.service'

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
