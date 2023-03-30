import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OtpRequest } from 'database/entities'
import { totp as totpFactory } from 'otplib'
import { EntityManager, Repository } from 'typeorm'

import { ConfigService } from '../config/config.service'

const NUM_MINUTES_IN_AN_HOUR = 60

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpRequest)
    private otpRequestRepository: Repository<OtpRequest>,
    private config: ConfigService,
  ) {}

  private totp = totpFactory.clone({
    step: this.config.get('otp.expiry'),
    window: [
      this.config.get('otp.numValidPastWindows'),
      this.config.get('otp.numValidFutureWindows'),
    ],
  })

  private concatSecretWithEmailAndTimestamp(
    email: string,
    createdAt: Date,
  ): string {
    const result =
      this.config.get('otp.secret') + email + createdAt.toISOString()
    return result
  }

  async generateOtp(
    email: string,
  ): Promise<{ token: string; timeLeft: number }> {
    const otpRequest = await this.otpRequestRepository.manager.transaction<
      OtpRequest | undefined
    >(async (manager: EntityManager) => {
      await manager.delete(OtpRequest, { email })
      await manager.insert(OtpRequest, { email })
      return manager.findOne(OtpRequest, { where: { email } })
    })
    if (!otpRequest)
      throw new HttpException(
        'Could not generate OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )

    const token = this.totp.generate(
      this.concatSecretWithEmailAndTimestamp(email, otpRequest.createdAt),
    )
    const timeLeft = this.totp.options.step
      ? Math.floor(this.totp.options.step / NUM_MINUTES_IN_AN_HOUR) // Round down to minutes
      : NaN
    return { token, timeLeft }
  }

  async verifyOtp(email: string, token: string): Promise<boolean> {
    return this.otpRequestRepository.manager.transaction<boolean>(
      async (manager: EntityManager) => {
        const otpRequest = await manager.findOne(OtpRequest, { email })
        if (!otpRequest || otpRequest.tries >= 3) {
          await manager.delete(OtpRequest, { email })
          throw new HttpException('Request for new OTP', HttpStatus.NOT_FOUND)
        }

        const isVerified = this.totp.verify({
          secret: this.concatSecretWithEmailAndTimestamp(
            email,
            otpRequest.createdAt,
          ),
          token,
        })
        if (!isVerified) {
          otpRequest.tries++
          await manager.save(otpRequest)
        } else {
          await manager.delete(OtpRequest, { email })
        }
        return isVerified
      },
    )
  }
}
