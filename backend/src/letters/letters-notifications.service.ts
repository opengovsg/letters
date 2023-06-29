import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Letter, Notifications, User } from '../database/entities'
import { communicationChannels } from '../types/notifications'
import { TwilioService } from './twilio.service'

@Injectable()
export class LettersNotificationsService {
  constructor(
    private readonly twilioService: TwilioService,
    @InjectRepository(Notifications)
    private readonly notificationRepository: Repository<Notifications>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async sendNotifications(
    userId: number,
    letters: Letter[],
    recipients: string[],
  ): Promise<Notifications[]> {
    const templatedMessages = await this.getTemplatedMessages(userId, letters)

    const messageSids = await this.sendSms(templatedMessages, recipients)

    return await this.createBulkNotification(
      communicationChannels.TWILIO,
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
    channel: communicationChannels,
    letters: Letter[],
    uuid: string[],
    messages: string[],
    recipients: string[],
  ): Promise<Notifications[]> {
    const newNotifications: Notifications[] = letters.map((letter, index) => {
      const notification = new Notifications()
      notification.channel = channel
      notification.letter_id = letter.id
      notification.uuid = uuid[index]
      notification.message = messages[index]
      notification.recipient = recipients[index]
      return notification
    })
    return await this.notificationRepository.save(newNotifications)
  }
}
