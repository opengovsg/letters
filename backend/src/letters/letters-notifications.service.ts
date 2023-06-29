import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Letter, User } from '../database/entities'
import { Notifications } from '../database/entities/notifications.entity'
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

  async createBulkNotification(
    channel: communicationChannels,
    letters: Letter[],
    uuid: string[],
    messages: string[],
    recipients: string[],
  ): Promise<Notifications[]> {
    const newNotifications: Notifications[] = []

    for (let i = 0; i < letters.length; i++) {
      const notification = new Notifications()
      notification.channel = channel
      notification.letter_id = letters[i].id
      notification.uuid = uuid[i]
      notification.message = messages[i]
      notification.recipient = recipients[i]
      newNotifications.push(notification)
    }

    return await this.notificationRepository.save(newNotifications)
  }

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

  async getTemplatedMessages(
    userId: number,
    letters: Letter[],
  ): Promise<string[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['email'],
    })
    const templatedMessages = letters.map((letter) => {
      const message = user
        ? `Hi there! You have a new letter from ${user.email}\n\nClick on the link to view the letter:\nhttps://letters.beta.gov.sg/${letter.publicId}`
        : `Hi there! You have a new letter from the government.\n\nClick on the link to view the letter:\nhttps://letters.beta.gov.sg/${letter.publicId}`
      return message
    })

    return templatedMessages
  }

  async sendSms(messages: string[], recipients: string[]) {
    const messageSids = []

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i]
      const recipient = recipients[i]

      try {
        const messageSid = await this.twilioService.sendMessage(
          message,
          recipient,
        )
        messageSids.push(messageSid)
      } catch (error) {
        throw { success: false }
      }
    }
    return messageSids
  }
}
