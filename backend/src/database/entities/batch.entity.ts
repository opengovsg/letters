import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Template } from './template.entity'
import { User } from './user.entity'

@Entity({ name: 'batches' })
export class Batch {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Template)
  template: Template
  @Column('int')
  templateId: number

  @ManyToOne(() => User)
  user: User
  @Column('int')
  userId: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
