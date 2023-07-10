import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Notification, User } from 'database/entities'

import { ConfigModule } from '../config/config.module'
import { TwilioClient } from './clients/twilio.client'
import { NotificationsService } from './notifications.service'
import { SmsNotificationsService } from './sms-notifications.service'

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Notification]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [NotificationsService, SmsNotificationsService, TwilioClient],
  exports: [NotificationsService],
})
export class NotificationsModule {}
