import { Injectable } from '@nestjs/common'
import convict, { Config, Path } from 'convict'

import { CONFIG_ACCESSIBLE_BY_FRONTEND } from '~shared/constants/config'

import { ConfigSchema, schema } from './config.schema'

// AWS param store does not support empty values, so we use a string placeholder of `'VALUE_NOT_SET'`
// If param store value is defined as `'VALUE_NOT_SET'`, we treat it as undefined and return the default value
const PLACEHOLDER_UNDEFINED = 'VALUE_NOT_SET'

@Injectable()
export class ConfigService {
  config: Config<ConfigSchema>

  constructor() {
    this.config = convict(schema)
    this.config.validate()
  }

  // We want to implicitly use the return type of convict get method.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get<K extends Path<ConfigSchema>>(key: K) {
    if (this.config.get(key) === PLACEHOLDER_UNDEFINED) {
      return this.config.default(key)
    }
    return this.config.get(key)
  }

  get isDevEnv(): boolean {
    return this.config.get('environment') === 'development'
  }

  get isProdEnv(): boolean {
    return this.config.get('environment') === 'production'
  }

  findOneById(id: string): string | undefined {
    if (!CONFIG_ACCESSIBLE_BY_FRONTEND.includes(id)) return
    return JSON.stringify(this.get(id as Path<ConfigSchema>))
  }
}
