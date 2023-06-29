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

  // Todo: are we sure these are the channels we will support?
  // changing this requires a db migration
  // do we need to settle on this now or can we decide this later and not have a column/psql enum for now?
  // is it even worth having an PSQL enum for this in general?
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
