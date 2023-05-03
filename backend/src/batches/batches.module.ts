import { Module } from '@nestjs/common'

import { BatchesController } from './batches.controller'
import { BatchesService } from './batches.service'

@Module({
  controllers: [BatchesController],
  providers: [BatchesService],
})
export class BatchesModule {}
