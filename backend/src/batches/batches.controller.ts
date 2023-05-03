import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { CreateBatchDto } from '../../../shared/src/dtos/create-batch.dto'
import { UpdateBatchDto } from '../../../shared/src/dtos/update-batch.dto'
import { BatchesService } from './batches.service'

@Controller('batches')
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @Post()
  create(@Body() createBatchDto: CreateBatchDto) {
    return this.batchesService.create(createBatchDto)
  }

  @Get()
  findAll() {
    return this.batchesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.batchesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatchDto: UpdateBatchDto) {
    return this.batchesService.update(+id, updateBatchDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batchesService.remove(+id)
  }
}
