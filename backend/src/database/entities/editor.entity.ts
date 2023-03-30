import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity, Template, User } from '.'

@Entity({ name: 'editors' })
export class Editor extends BaseEntity {
  @ManyToOne(() => Template, { nullable: false })
  @JoinColumn({ name: 'template' })
  template!: Template

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user' })
  user!: User
}
