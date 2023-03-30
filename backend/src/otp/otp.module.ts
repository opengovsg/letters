import { Module, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OtpRequest } from 'database/entities'

import { ConfigModule } from '../config/config.module'
import { OtpService } from './otp.service'

@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([OtpRequest])],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
