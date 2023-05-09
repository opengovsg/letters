import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Batch } from '../database/entities'
import { BatchesController } from './batches.controller'
import { BatchesService } from './batches.service'

@Module({
  imports: [TypeOrmModule.forFeature([Batch])],
  controllers: [BatchesController],
  providers: [BatchesService],
  exports: [BatchesService],
})
export class BatchesModule {}
