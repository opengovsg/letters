import User from '../database/entities/user.entity'

declare module 'express-session' {
  interface SessionData {
    user: User
  }
}
