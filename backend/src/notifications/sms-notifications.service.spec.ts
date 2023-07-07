/* eslint-disable @typescript-eslint/unbound-method */
import { PinoLogger } from 'nestjs-pino'

import { ConfigService } from '../config/config.service'
import { TwilioClient } from './clients/twilio.client'
import { SmsNotificationsService } from './sms-notifications.service'

describe('SmsNotificationsService', () => {
  let service: SmsNotificationsService
  let smsClient: TwilioClient
  let logger: PinoLogger
  let config: ConfigService

  const mockLogger = {
    error: jest.fn(),
  }

  const mockConfigService = {
    get: jest.fn(),
  }

  const mockMessageSid = 'MOCK_MESSAGE_SID'
  const mockTwilioClient = {
    sendMessage: jest.fn().mockResolvedValue(mockMessageSid),
  }

  beforeEach(() => {
    jest.resetAllMocks()
    smsClient = mockTwilioClient as unknown as TwilioClient
    logger = mockLogger as unknown as PinoLogger
    config = mockConfigService as unknown as ConfigService
    service = new SmsNotificationsService(smsClient, logger, config)
  })

  describe('standardizePhoneNumber', () => {
    const tests = [
      '82345678',
      '6582345678',
      '65-82345678',
      '+6582345678',
      '+65-82345678',
    ]

    for (let i = 0; i < tests.length; i++) {
      it('should standardize phone number and return phone number prefixed with +65', () => {
        const actual = service.standardizePhoneNumber(tests[i])
        expect(actual).toBe('+6582345678')
      })
    }

    it('should throw an error for an invalid phone number format', () => {
      const recipient = '12345678'

      expect(() => {
        service.standardizePhoneNumber(recipient)
      }).toThrowError('Not in accepted Singapore phone number format')
    })
  })

  describe('isInSmsAllowList', () => {
    it('should return true if smsAllowList is "*" (allow all)', () => {
      jest.spyOn(config, 'get').mockReturnValue('*')

      const result = service.isInSmsAllowList('+6512345678')

      expect(result).toBe(true)
      expect(config.get).toHaveBeenCalledWith('smsAllowList')
    })

    it('should return true if recipient is in smsAllowList', () => {
      jest.spyOn(config, 'get').mockReturnValue('+6512345678,allowed1,allowed2')

      const result = service.isInSmsAllowList('+6512345678')

      expect(result).toBe(true)
      expect(config.get).toHaveBeenCalledWith('smsAllowList')
    })

    it('should return false if recipient is not in smsAllowList', () => {
      jest.spyOn(config, 'get').mockReturnValue('allowed1,allowed2,allowed3')

      const result = service.isInSmsAllowList('+6598765432')

      expect(result).toBe(false)
      expect(config.get).toHaveBeenCalledWith('smsAllowList')
    })

    it('should return false if smsAllowList is not set', () => {
      jest.spyOn(config, 'get').mockReturnValue('')

      const result = service.isInSmsAllowList('+6512345678')

      expect(result).toBe(false)
      expect(config.get).toHaveBeenCalledWith('smsAllowList')
    })
  })

  describe('send', () => {
    it('should send messages and return sent messages', async () => {
      const mockTemplatedMessage = { message: 'Hello', letterId: 1 }
      const mockRecipient = '82345678'
      jest
        .spyOn(service, 'standardizePhoneNumber')
        .mockReturnValue(`+65${mockRecipient}`)
      jest.spyOn(service, 'isInSmsAllowList').mockReturnValue(true)
      jest.spyOn(smsClient, 'sendMessage').mockResolvedValue(mockMessageSid)

      const result = await service.send([mockTemplatedMessage], [mockRecipient])

      expect(service.standardizePhoneNumber).toHaveBeenCalledWith(mockRecipient)
      expect(service.isInSmsAllowList).toHaveBeenCalledWith(
        `+65${mockRecipient}`,
      )
      expect(smsClient.sendMessage).toHaveBeenCalledWith(
        'Hello',
        `+65${mockRecipient}`,
        false,
      )
      expect(result).toEqual([
        {
          ...mockTemplatedMessage,
          channel: 'TWILIO',
          recipient: mockRecipient,
          providerId: mockMessageSid,
        },
      ])
    })

    it('should catch and log errors', async () => {
      const mockError = new Error('Mock error')
      const mockTemplatedMessage = { message: 'Hello', letterId: 1 }
      const mockRecipient = '82345678'
      jest
        .spyOn(service, 'standardizePhoneNumber')
        .mockReturnValue(`+65${mockRecipient}`)
      jest.spyOn(service, 'isInSmsAllowList').mockReturnValue(true)
      jest.spyOn(smsClient, 'sendMessage').mockRejectedValue(mockError)
      jest.spyOn(logger, 'error')

      const result = await service.send([mockTemplatedMessage], [mockRecipient])

      expect(service.standardizePhoneNumber).toHaveBeenCalledWith(mockRecipient)
      expect(service.isInSmsAllowList).toHaveBeenCalledWith(
        `+65${mockRecipient}`,
      )
      expect(smsClient.sendMessage).toHaveBeenCalledWith(
        'Hello',
        `+65${mockRecipient}`,
        false,
      )
      expect(logger.error).toHaveBeenCalledWith(mockError)
      expect(result).toEqual([
        {
          ...mockTemplatedMessage,
          channel: 'TWILIO',
          recipient: mockRecipient,
          providerId: undefined,
        },
      ])
    })
  })
})
