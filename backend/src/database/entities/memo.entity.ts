import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity, TemplateVersion, User } from '.'

// TODO: Abstract constants
export enum UinType {
  'NRIC' = 'NRIC',
}

@Entity({ name: 'memos' })
export class Memo extends BaseEntity {
  @ManyToOne(() => TemplateVersion, { nullable: false })
  @JoinColumn({ name: 'template_version' })
  templateVersion!: TemplateVersion

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'issuer' })
  issuer!: User

  @Column()
  uin!: string

  @Column()
  uinType!: UinType

  @Column()
  @Index({ unique: true }) // optimize for queries
  slug!: string

  @Column({ type: 'jsonb' })
  params!: Record<string, string>

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt?: Date

  @Column({ default: false })
  isViewed!: boolean

  @Column({ default: false })
  isVoid!: boolean

  @Column({ nullable: true })
  voidReason?: string
}
