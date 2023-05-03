import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const requestUserId = request.session?.user?.id
    if (requestUserId === undefined) {
      throw new UnauthorizedException('User is not logged in.')
    }
    const { userId } = request.params
    return requestUserId === Number(userId)
  }
}
