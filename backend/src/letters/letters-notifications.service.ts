import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Letter, Notification, User } from '../database/entities'
import { NotificationChannel } from '../types/notification'
import { TwilioService } from './twilio.service'

@Injectable()
export class LettersNotificationsService {
  constructor(
    private readonly twilioService: TwilioService,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async sendNotifications(
    userId: number,
    letters: Letter[],
    recipients: string[],
  ): Promise<Notification[]> {
    const templatedMessages = await this.getTemplatedMessages(userId, letters)

    const messageSids = await this.sendSms(templatedMessages, recipients)

    return await this.createBulkNotification(
      NotificationChannel.TWILIO,
      letters,
      messageSids,
      templatedMessages,
      recipients,
    )
  }

  private async getTemplatedMessages(
    userId: number,
    letters: Letter[],
  ): Promise<string[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['email'],
    })

    const templatedMessages = letters.map((letter) => {
      // Todo: we could also just throw an error as this case should never happen
      const sender = user ? user.email : 'the government'
      return `Hi there! You have a new letter from ${sender}\n\nClick on the link to view the letter:\n${letter.publicId}`
    })

    return templatedMessages
  }

  private async sendSms(messages: string[], recipients: string[]) {
    const messageSids: string[] = []

    // Todo: Error handling. abort all if one fails?
    // Shold we even wait for the responses in the first place?
    await Promise.allSettled(
      messages.map(async (message, index) => {
        const recipient = recipients[index]

        try {
          const messageSid = await this.twilioService.sendMessage(
            message,
            recipient,
          )
          messageSids.push(messageSid)
        } catch (error) {
          throw { success: false }
        }
      }),
    )
    return messageSids
  }

  private async createBulkNotification(
    channel: NotificationChannel,
    letters: Letter[],
    uuid: string[],
    messages: string[],
    recipients: string[],
  ): Promise<Notification[]> {
    const newNotifications: Notification[] = letters.map((letter, index) => {
      const notification = new Notification()
      notification.channel = channel
      notification.letterId = letter.id
      notification.providerId = uuid[index]
      notification.message = messages[index]
      notification.recipient = recipients[index]
      return notification
    })
    return await this.notificationRepository.save(newNotifications)
  }
}
