import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity, Template, User } from '.'

@Entity({ name: 'issuers' })
export class Issuer extends BaseEntity {
  @ManyToOne(() => Template, { nullable: false })
  @JoinColumn({ name: 'template' })
  template!: Template

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user' })
  user!: User
}
