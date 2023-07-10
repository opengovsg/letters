import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Letter } from './letter.entity'

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  // channel is not enforced as an enum on DB layer
  // allows us to avoid future migrations if we extend to other channels
  @Column('text')
  channel: string

  @ManyToOne(() => Letter)
  letter: Letter
  @Column('int')
  letterId: number

  @Column('varchar', { length: 255, unique: true, nullable: true })
  providerId: string

  @Column('text')
  message: string

  @Column('text')
  recipient: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
