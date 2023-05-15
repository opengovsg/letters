import { InjectPinoLogger, PinoLogger } from "nestjs-pino"
import { Injectable } from "@nestjs/common"
import { HttpService } from '@nestjs/axios'

import { ConfigService } from "../config/config.service"

@Injectable()
export class LinkShortenterService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectPinoLogger(ConfigService.name)
    private readonly logger: PinoLogger
  ) {}

  async generateShortLink(longURL: string): Promise<string> {
    const createShortLinkEndpoint = `${this.configService.get('gogovsgApiEndpoint')}/api/v1/urls`
    const response = await this.httpService.post(createShortLinkEndpoint, {
      "longUrl": longURL
    }, {
      headers: {
        "Authorization": `Bearer ${this.configService.get('gogovsgApiKey')}`
      }
    })
    console.log(JSON.stringify(response))
    return ""
  }
}