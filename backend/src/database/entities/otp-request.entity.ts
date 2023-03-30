import { Entity, Column } from 'typeorm'
import { BaseEntity } from '.'

@Entity({ name: 'otp_requests' })
export class OtpRequest extends BaseEntity {
  @Column({
    unique: true,
  })
  email!: string

  @Column({
    default: 0,
  })
  tries!: number
}
