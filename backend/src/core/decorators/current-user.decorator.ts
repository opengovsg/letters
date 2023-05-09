import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { session } = ctx.switchToHttp().getRequest<Request>()

    if (!session.user) throw new Error('User does not exist on request')
    return session.user
  },
)
