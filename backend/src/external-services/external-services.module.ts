import { Global, Module } from '@nestjs/common'
import { HttpModule, HttpService } from "@nestjs/axios";

import { ConfigModule } from '../config/config.module'
import { LinkShortenterService } from "./link-shortenter.service";


@Global()
@Module({
  imports: [ConfigModule, HttpModule],
  providers: [LinkShortenterService],
  exports: [LinkShortenterService],
})
export class ExternalServicesModule {}
