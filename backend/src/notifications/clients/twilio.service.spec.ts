import { PinoLogger } from 'nestjs-pino'

import { ConfigService } from '../../config/config.service'
import { TwilioService } from './twilio.service'

describe('TwilioService', () => {
  let twilioService: TwilioService
  let config: ConfigService
  let logger: PinoLogger

  const mockLogger = {
    info: jest.fn(),
  }

  const mockConfigService = {
    get: jest.fn(),
  }

  const message = 'Hello, recipient!'
  const recipient = '6588889991'

  beforeEach(() => {
    jest.resetAllMocks()
    config = mockConfigService as unknown as ConfigService
    logger = mockLogger as unknown as PinoLogger
    twilioService = new TwilioService(config, logger)
  })

  describe('sendMessage', () => {
    it('should send an SMS when allow list is "*"', async () => {
      // setup
      jest.spyOn(config, 'get').mockImplementation(((key: string) => {
        if (key === 'twilioApi.accountSid') return 'mock-accountSid'
        if (key === 'twilioApi.authToken') return 'mock-authToken'
        if (key === 'twilioApi.messagingServiceSid')
          return 'mock-messagingServiceSid'
        if (key === 'smsAllowList') return '*'
        return undefined
      }) as never)

      const mockClient = {
        messages: {
          create: jest.fn().mockResolvedValue({ sid: 'mock-sid' }),
        },
      }
      const getClientSpy = jest
        .spyOn(twilioService as any, 'getClient')
        .mockReturnValue(mockClient)

      // test
      const sid = await twilioService.sendMessage(message, recipient)

      // assert
      expect(getClientSpy).toHaveBeenCalledWith({ logOnly: false })
      expect(mockClient.messages.create).toHaveBeenCalledWith({
        messagingServiceSid: 'mock-messagingServiceSid',
        body: message,
        to: recipient,
      })
      expect(sid).toBe('mock-sid')
    })

    it('should send an SMS when recipient is in allow list', async () => {
      // setup
      jest.spyOn(config, 'get').mockImplementation(((key: string) => {
        if (key === 'twilioApi.accountSid') return 'mock-accountSid'
        if (key === 'twilioApi.authToken') return 'mock-authToken'
        if (key === 'twilioApi.messagingServiceSid')
          return 'mock-messagingServiceSid'
        if (key === 'smsAllowList') return '6588889991,6588889992'
        return undefined
      }) as never)

      const mockClient = {
        messages: {
          create: jest.fn().mockResolvedValue({ sid: 'mock-sid' }),
        },
      }
      const getClientSpy = jest
        .spyOn(twilioService as any, 'getClient')
        .mockReturnValue(mockClient)

      // test
      const sid = await twilioService.sendMessage(message, recipient)

      // assert
      expect(getClientSpy).toHaveBeenCalledWith({ logOnly: false })
      expect(mockClient.messages.create).toHaveBeenCalledWith({
        messagingServiceSid: 'mock-messagingServiceSid',
        body: message,
        to: recipient,
      })
      expect(sid).toBe('mock-sid')
    })

    it('should log-only when recipient is not in the allow list', async () => {
      // setup
      jest.spyOn(config, 'get').mockImplementation(((key: string) => {
        if (key === 'twilioApi.accountSid') return 'mock-accountSid'
        if (key === 'twilioApi.authToken') return 'mock-authToken'
        if (key === 'twilioApi.messagingServiceSid')
          return 'mock-messagingServiceSid'
        if (key === 'smsAllowList') return '6588889999'
        return undefined
      }) as never)

      const mockClient = {
        messages: {
          create: jest.fn().mockResolvedValue({
            sid: `DEV_MODE_NO_SMS_SENT_mock-public-id`,
          }),
        },
      }
      const getClientSpy = jest
        .spyOn(twilioService as any, 'getClient')
        .mockReturnValue(mockClient)

      // test
      const sid = await twilioService.sendMessage(message, recipient)

      // assert
      expect(getClientSpy).toHaveBeenCalledWith({ logOnly: true })
      expect(mockClient.messages.create).toHaveBeenCalledWith({
        messagingServiceSid: 'mock-messagingServiceSid',
        body: message,
        to: recipient,
      })
      expect(sid).toBe(`DEV_MODE_NO_SMS_SENT_mock-public-id`)
    })
  })
})
