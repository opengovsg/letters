import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Batch } from './batch.entity'
import { Template } from './template.entity'
import { User } from './user.entity'

@Entity({ name: 'letters' })
export class Letter {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Batch)
  batch: Batch
  @Column('int')
  batchId: number

  @Column('text')
  publicId: string

  @ManyToOne(() => Template)
  template: Template
  @Column('int')
  templateId: number

  @ManyToOne(() => User)
  user: User
  @Column('int')
  userId: number

  @Column('text')
  issuedLetter: string

  @Column('text')
  fieldValues: string

  @Column('text')
  shortLink: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
