import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'auth/auth.module'
import { HealthModule } from 'health/health.module'
import { MemosModule } from 'memos/memos.module'
import { TemplatesModule } from 'templates/templates.module'
import { UsersModule } from 'users/users.module'
import { DatabaseConfigService } from 'database/database-config.service'

const apiModules = [
  AuthModule,
  HealthModule,
  TemplatesModule,
  UsersModule,
  MemosModule,
]

@Module({
  imports: [
    ...apiModules,
    // Configure prefix for all API modules
    RouterModule.register([
      {
        path: 'api',
        children: apiModules,
      },
    ]),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
  ],
})
export class ApiModule {}
