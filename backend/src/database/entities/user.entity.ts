import { Entity, Column } from 'typeorm'
import { BaseEntity } from './'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({
    unique: true,
    nullable: true,
  })
  email!: string

  @Column({
    nullable: true,
  })
  apiKeyHash?: string

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  apiKeyScopes?: string[]
}
