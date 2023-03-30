import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { ConfigService } from 'config/config.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const config = app.get(ConfigService)
  const environment = config.get('environment')
  if (['staging', 'production'].includes(environment)) {
    app.set('trust proxy', 1)
  }

  // https://docs.nestjs.com/techniques/validation#transform-payload-objects
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Memos')
    .setDescription('Memos API')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  // How to write swagger docs? Use dtos, class validators, and other decorators
  // https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin
  // https://docs.nestjs.com/openapi/decorators
  // https://github.com/typestack/class-validator

  await app.listen(config.get('port'))
}

bootstrap()
