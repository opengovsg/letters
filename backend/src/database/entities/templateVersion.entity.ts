import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { TemplateBlock } from '../../types'
import { BaseEntity, Template, User } from '.'

@Entity({ name: 'template_versions' })
export class TemplateVersion extends BaseEntity {
  @ManyToOne(() => Template, { nullable: false })
  @JoinColumn({ name: 'template' })
  template!: Template

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'editor' })
  editor!: User

  @Column({ type: 'jsonb' })
  body!: TemplateBlock[]

  @Column({
    type: 'jsonb',
  })
  paramsRequired!: string[]

  // Defaults to true because a new version should, by definition, be the latest
  @Column({ default: true })
  isLatestVersion!: boolean

  @Column()
  version!: number
}
