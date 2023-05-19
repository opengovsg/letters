import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from 'config/config.service'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import helmet from 'helmet'

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private middleware: RequestHandler

  constructor(private config: ConfigService) {
    this.middleware = helmet({
      crossOriginEmbedderPolicy: { policy: 'credentialless' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          blockAllMixedContent: [],
          connectSrc: ["'self'", 'https://*.browser-intake-datadoghq.com'],
          workerSrc: ['blob:'],
          // for google fonts
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          frameSrc: [],
          frameAncestors: ["'none'"],
          imgSrc: ["'self'", 'data:', 'https://file.go.gov.sg'],
          objectSrc: ["'none'"],
          // for google fonts
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://fonts.googleapis.com',
            'https://cdn.tiny.cloud',
          ],
          scriptSrcAttr: ["'none'"],
          scriptSrc: ["'self'", 'https://cdn.tiny.cloud'],
          upgradeInsecureRequests: config.isDevEnv ? null : [],
        },
      },
    })
  }

  use(req: Request, res: Response, next: NextFunction): void {
    this.middleware(req, res, next)
  }
}
