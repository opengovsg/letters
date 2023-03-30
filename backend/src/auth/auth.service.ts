import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GenerateOtpDto, VerifyOtpDto } from './dto/index'
import { User } from '../database/entities'
import { Logger } from '@nestjs/common'
import { OtpService } from '../otp/otp.service'
import { MailerService } from '../mailer/mailer.service'
import { EntityManager, Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private otpService: OtpService,
    private mailerService: MailerService,
  ) {}

  async generateOtp(generateOtpDto: GenerateOtpDto): Promise<void> {
    const { email } = generateOtpDto
    const { token, timeLeft } = await this.otpService.generateOtp(email)

    const html = `Your OTP is <b>${token}</b>. It will expire in ${timeLeft} minutes.
    Please use this to login to your account.
    <p>If your OTP does not work, please request for a new one.</p>`

    // TODO: Replace the `from` and `subject` fields with content specific to your application
    const mail = {
      to: email,
      subject: 'One-Time Password (OTP) for Memo',
      html,
    }

    Logger.log(`Sending mail to ${email}`)
    return this.mailerService.sendMail(mail)
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<User | undefined> {
    const { email, token } = verifyOtpDto
    const isVerified = await this.otpService.verifyOtp(email, token)
    if (isVerified) {
      // findOrCreateUser
      const user = await this.userRepository.manager.transaction<User>(
        async (manager: EntityManager) => {
          let foundUser = await manager.findOne(User, {
            where: { email: email },
          })
          if (!foundUser) {
            const newUser = manager.create(User, {
              email,
            })
            foundUser = await manager.save(newUser)
          }
          return foundUser
        },
      )
      return user
    }
    return
  }
}
