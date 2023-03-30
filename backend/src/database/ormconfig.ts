import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import convict from 'convict'
import { join } from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { schema } from '../config/config.schema'
const config = convict(schema)
export default {
  type: 'postgres',
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.name'),
  logging: config.get('database.logging'),
  synchronize: true, // do not automatically sync entities
  // js for runtime, ts for typeorm cli
  entities: [join(__dirname, 'entities', '*.entity{.js,.ts}')],
  migrations: [join(__dirname, 'migrations', '*{.js,.ts}')],
  cli: {
    migrationsDir: join(__dirname, 'migrations'),
  },
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    min: config.get('database.minPool'),
    max: config.get('database.maxPool'),
  },
} as TypeOrmModuleOptions
