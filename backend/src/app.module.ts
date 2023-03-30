import { join } from 'path'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'

import { HelmetMiddleware } from 'middlewares/helmet.middleware'
import { SessionMiddleware } from 'middlewares/session.middleware'

import { ApiModule } from './api.module'

@Module({
  imports: [
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
      serveStaticOptions: {
        maxAge: 2 * 60 * 60 * 1000, // 2 hours, same as cloudflare
        setHeaders: function (res, path) {
          // set maxAge to 0 for root index.html
          if (
            path ===
            join(__dirname, '..', '..', 'frontend', 'build', 'index.html')
          ) {
            res.setHeader('Cache-control', 'public, max-age=0')
          }
        },
      },
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply CSP headers to all routes
    consumer.apply(HelmetMiddleware).forRoutes('*')

    // Only apply session header for API routes
    consumer.apply(SessionMiddleware).forRoutes('/api/*')
  }
}
