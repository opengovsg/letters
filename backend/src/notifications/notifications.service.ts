import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Letter, Notification, User } from '../database/entities'
import { SmsNotificationsService } from './sms-notifications.service'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly smsNotificationService: SmsNotificationsService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async sendNotifications(
    userId: number,
    letters: Letter[],
    recipients: string[],
  ): Promise<Notification[]> {
    const templatedMessages = await this.getTemplatedMessages(userId, letters)
    const sentMessages = await this.smsNotificationService.send(
      templatedMessages,
      recipients,
    )

    return this.notificationRepository.save(sentMessages)
  }

  private async getTemplatedMessages(
    userId: number,
    letters: Letter[],
  ): Promise<{ message: string; letterId: number }[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['email'],
    })

    return letters.map((letter) => {
      const sender = user ? user.email : 'the government'
      return {
        message: `Hi there! You have a new letter from ${sender}\n\nClick on the link to view the letter:\n https://letters.beta.gov.sg/${letter.publicId}`,
        letterId: letter.id,
      }
    })
  }
}
