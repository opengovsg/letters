import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule } from '../config/config.module'
import { MailerModule } from '../mailer/mailer.module'
import { OtpRequest, User } from '../database/entities'
import { getRepositoryToken } from '@nestjs/typeorm'
import { OtpService } from 'otp/otp.service'

describe('AuthController', () => {
  let controller: AuthController
  const mockRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, MailerModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        OtpService,
        {
          provide: getRepositoryToken(OtpRequest),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
