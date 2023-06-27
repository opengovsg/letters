import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { communicationChannels } from '../../types/notifications'

@Entity({ name: 'notifications' })
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: communicationChannels,
  })
  channel: communicationChannels

  @Column('int')
  letter_id: number

  @Column('varchar', { length: 255, nullable: false, unique: true })
  uuid: string

  @Column('text')
  message: string

  @Column('text')
  recipient: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
