import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'templates' })
export class Template {
  @PrimaryGeneratedColumn()
  id: number

  @Column('jsonb', { nullable: false, default: {} })
  fields: string

  @Column('text')
  html: string

  @Column('text')
  name: string

  @Column('text')
  thumbnailS3Path: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
